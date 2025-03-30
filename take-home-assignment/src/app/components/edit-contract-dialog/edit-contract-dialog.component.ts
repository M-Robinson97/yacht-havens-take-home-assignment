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
    public form: FormGroup = this.fb.group({});

    private contractTypeSubscription: Subscription | undefined;
    private startDateSubscription: Subscription | undefined;
    private endDateSubscription: Subscription | undefined;
    
    constructor(
        @Inject(MAT_DIALOG_DATA)
        private data: EditContractDialogData,
        private dialogRef: MatDialogRef<EditContractDialogComponent>,
        private quoteService: QuoteService,
        private fb: FormBuilder, 
        private enumService: EnumService
    ) {}

    ngOnInit(): void {
        this.contractId = this.data.contract.id;
        this.customerName = this.data.contract.customerName;
        this.statuses$ = this.enumService.getContractStatuses();
        this.contractTypes$ = this.enumService.getContractTypes();
        this.buildForm();
        this.subscribeToFormChanges();
    }

    private buildForm(): void {
        //const formattedQuote = this.quoteService.formatQuoteWithCurrency(this.data.contract.currency, this.quote);
        //console.log(formattedQuote);
        this.form.addControl('status', this.fb.control(this.data.contract.contractStatus));
        this.form.addControl('contractType', this.fb.control(this.data.contract.contractType));
        this.form.addControl('startDate', this.fb.control(this.data.contract.startDate));
        this.form.addControl('endDate', this.fb.control(this.data.contract.endDate));
        this.form.addControl('quote', this.fb.control(this.data.contract.totalIncVat));
    }

    private subscribeToFormChanges() {
        this.contractTypeSubscription = (this.form.get('contractType') as FormControl).valueChanges.subscribe(value => {
            this.recalculateQuote();
        });
        this.startDateSubscription = (this.form.get('startDate') as FormControl).valueChanges.subscribe(value => {
            this.recalculateQuote();
        });
        this.endDateSubscription = (this.form.get('endDate') as FormControl).valueChanges.subscribe(value => {
            this.recalculateQuote();
        });
    }

    private recalculateQuote() {
        this.getQuote();
        
    }

    private getQuote(): void {
        const quoteParams = this.buildQuoteParams();
        this.quoteService.getQuote(quoteParams).subscribe({
            next: (newQuote) => {
              (this.form.get('startDate') as FormControl)?.patchValue(newQuote);
              console.log(newQuote);
            },
            error: (err) => {
              console.error('Error fetching quote:', err);
            }
          });
    }

    private buildQuoteParams(): GetQuoteParams{
        return {
            contractType: this.form.get('contractType')?.value ?? this.data.contract.contractType,
            startDate: this.form.get('startDate')?.value ?? this.data.contract.startDate,
            endDate: this.form.get('endDate')?.value ?? this.data.contract.endDate,
        };
    }

    public update(): void {
        this.getQuote();

        /*
        NOTE: Quote has been successfully calculated and stored as getQuote
        NEED TO:
        - DISPLAY QUOTE ON SCREEN WHEN UPDATING FIELD RATHER THAN ON CLICKING UPDATE
        - CLICKING UPDATE SHOULD UPDATE RELEVANT ROW
        */
    }

    public ngOnDestroy() {
        if (this.contractTypeSubscription) this.contractTypeSubscription.unsubscribe();
        if (this.startDateSubscription) this.startDateSubscription.unsubscribe();
        if (this.endDateSubscription) this.endDateSubscription.unsubscribe();
    }
}
