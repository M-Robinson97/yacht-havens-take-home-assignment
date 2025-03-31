import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditContractDialogData } from './edit-contract-dialog.component.model';
import { QuoteService } from 'src/app/services/quote.service';
import { Observable, Subscription } from 'rxjs';
import { ContractStatus } from 'src/app/enums/contract-status.enum';
import { ContractType } from 'src/app/enums/contract-type.enum';
import { EnumView } from 'src/app/models/enum-view.model';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { EnumService } from 'src/app/services/enum.service';
import { GetQuoteParams } from 'src/app/models/quote.model';
import { debounceTime, filter } from 'rxjs/operators';
import { ContractsService } from 'src/app/services/contracts.service';
import { Contract } from 'src/app/models/contract.model';
import { DateService } from 'src/app/services/date.service';

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
    public displayInvalidDateWarning: boolean = false;
    public displayDatesRequiredWarning: boolean = false;

    private formSubscription: Subscription | undefined;
    
    constructor(
        @Inject(MAT_DIALOG_DATA)
        private data: EditContractDialogData,
        private dialogRef: MatDialogRef<EditContractDialogComponent>,
        private quoteService: QuoteService,
        private contractsService: ContractsService,
        private dateService: DateService,
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

    ngOnDestroy() {
        if (this.formSubscription) this.formSubscription.unsubscribe();
    }

    public update(): void {
        const quote = this.quote;
        const cleanedQuote = quote.replace(/[^\d.]/g, '');
        const quoteNumber = parseFloat(cleanedQuote);

        const contractFields = 
            {
                contractType: this.form.get('contractType')?.value,
                contractStatus: this.form.get('status')?.value,
                startDate: this.form.get('startDate')?.value,
                endDate: this.form.get('endDate')?.value,
                totalIncVat: quoteNumber
            } as Contract;
        
        const updatedContract = { ...this.data.contract, ...contractFields }

        this.contractsService.updateContract(updatedContract).subscribe({
            next: () => {
                this.dialogRef.close(updatedContract);
                alert('Contract updated');
            },
            error: (err) => {
              alert('There was a problem updating the contract');
              console.error(err);
            }
          });
    }

    private buildForm(): void {
        this.form = this.fb.group({
            status: [this.data.contract.contractStatus],
            contractType: [this.data.contract.contractType],
            startDate: [this.data.contract.startDate, [Validators.required]],
            endDate: [this.data.contract.endDate, [Validators.required]]
        },{ validators: [dateRangeValidator(this.dateService)] }
    );
    }

    private subscribeToFormChanges() {
        this.form.valueChanges
        .pipe(
            debounceTime(500),
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
        this.displayDatesRequiredWarning = this.form.get('startDate')?.errors?.['required'] || this.form.get('endDate')?.errors?.['required'];
        if(this.displayDatesRequiredWarning) {
            this.quote = this.quoteService.formatQuoteWithCurrency(this.data.contract.currency, 0);
            return;
        };
        this.displayInvalidDateWarning = this.form.errors?.invalidDateRange;
        
        const quoteParams = this.form.value as GetQuoteParams;
        this.quoteService.getQuote(quoteParams).subscribe({
            next: (newQuote) => {
                this.quote = this.quoteService.formatQuoteWithCurrency(this.data.contract.currency, newQuote);
            },
            error: (err) => {
                console.error('Error fetching quote:', err);
            }
          });
    }  
}

function dateRangeValidator(dateService: DateService): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const form = control as FormGroup;
        const startDate = form.get('startDate')?.value;
        const endDate = form.get('endDate')?.value;
        if(!dateService.isValidDateRange(startDate, endDate)) {
            return { 'invalidDateRange': true };
        };
        return null;
      };
}