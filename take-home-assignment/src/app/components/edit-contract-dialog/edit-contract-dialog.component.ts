import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditContractDialogData } from './edit-contract-dialog.component.model';
import { QuoteService } from 'src/app/services/quote.service';
import { Observable, Subscription } from 'rxjs';
import { ContractStatus } from 'src/app/enums/contract-status.enum';
import { ContractType } from 'src/app/enums/contract-type.enum';
import { EnumView } from 'src/app/models/enum-view.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EnumService } from 'src/app/services/enum.service';
import { GetQuoteParams } from 'src/app/models/quote.model';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-edit-contract-dialog',
    templateUrl: './edit-contract-dialog.component.html',
    styleUrls: ['./edit-contract-dialog.component.scss'],
})
export class EditContractDialogComponent implements OnInit, OnDestroy {

    public contractId!: number;
    public customerName!: string;
    public statuses$!: Observable<EnumView<ContractStatus>[]>;
    public contractTypes$!: Observable<EnumView<ContractType>[]>;
    public form!: FormGroup;
    public quote!: string;

    private formSubscription: Subscription | undefined;
    
    constructor(
        @Inject(MAT_DIALOG_DATA)
        private data: EditContractDialogData,
        private dialogRef: MatDialogRef<EditContractDialogComponent>,
        private quoteService: QuoteService,
        private fb: FormBuilder, 
        private enumService: EnumService
    ) {

        this.contractId = this.data.contract.id;
        this.customerName = this.data.contract.customerName;
        this.statuses$ = this.enumService.getContractStatuses();
        this.contractTypes$ = this.enumService.getContractTypes();
        this.quote = this.quoteService.formatQuoteWithCurrency(this.data.contract.currency, this.data.contract.totalIncVat);
    }

    ngOnInit(): void {
        this.buildForm();
        this.subscribeToFormChanges();
    }

    private buildForm(): void {
        this.form = this.fb.group({
            status: new FormControl(this.data.contract.contractStatus),
            contractType: new FormControl(this.data.contract.contractType),
            startDate: new FormControl(this.data.contract.startDate),
            endDate: new FormControl(this.data.contract.endDate),
        });
    }

    private subscribeToFormChanges() {
        this.form.valueChanges
        .pipe(
            filter(() => {
                const changedControls = Object.keys(this.form.controls).filter(key => this.form.get(key)?.dirty);
                if(changedControls.includes('status')) {
                    this.form.get('status')?.markAsPristine();
                    return false;
                }
                return true;
            })
        )
        .subscribe(() => {
            this.getQuote();
        });
      }

    private getQuote(): void {
        const quoteParams = this.form.value as GetQuoteParams;

        this.quoteService.getQuote(quoteParams).subscribe({
            next: (newQuote) => {
                this.quote = this.quoteService.formatQuoteWithCurrency(this.data.contract.currency, newQuote);
                console.log(this.quote);
            },
            error: (err) => {
                console.error('Error fetching quote:', err);
            }
          });
    }

    public update(): void {
        //this.getQuote();
        /*
        NEED TO:
        - CLICKING UPDATE SHOULD UPDATE RELEVANT ROW
        - VALIDATE DATES
        */
    }

    public ngOnDestroy() {
        if (this.formSubscription) this.formSubscription.unsubscribe();
    }
}
