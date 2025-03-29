import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditContractDialogData } from './edit-contract-dialog.component.model';
import { QuoteService } from 'src/app/services/quote.service';
import { Observable } from 'rxjs';
import { ContractStatus } from 'src/app/enums/contract-status.enum';
import { ContractType } from 'src/app/enums/contract-type.enum';
import { EnumView } from 'src/app/models/enum-view.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EnumService } from 'src/app/services/enum.service';
import { GetQuoteParams } from 'src/app/models/quote.model';

@Component({
    selector: 'app-edit-contract-dialog',
    templateUrl: './edit-contract-dialog.component.html',
    styleUrls: ['./edit-contract-dialog.component.scss'],
})
export class EditContractDialogComponent implements OnInit {

    public quote!: number;
    public statuses$!: Observable<EnumView<ContractStatus>[]>;
    public contractTypes$!: Observable<EnumView<ContractType>[]>;
    public startDate: string = '';
    public endDate: string = '';

    public form: FormGroup = this.fb.group({});
    
    constructor(
        @Inject(MAT_DIALOG_DATA)
        private data: EditContractDialogData,
        private dialogRef: MatDialogRef<EditContractDialogComponent>,
        private quoteService: QuoteService,
        private fb: FormBuilder, 
        private enumService: EnumService
    ) {}

    ngOnInit(): void {
        this.statuses$ = this.enumService.getContractStatuses();
        this.contractTypes$ = this.enumService.getContractTypes();
        this.quote = this.data.contract.totalIncVat;
        this.addControls();
    }

    private addControls(): void {
        this.form.addControl('status', this.fb.control(null));
        this.form.addControl('contractType', this.fb.control(null));
        this.form.addControl('startDate', this.fb.control(null));
        this.form.addControl('endDate', this.fb.control(null));
    }

    private getQuote(): void {
        const quoteParams = this.buildQuoteParams();
        this.quoteService.getQuote(quoteParams).subscribe({
            next: (value) => {
              this.quote = value;
              console.log(this.quote);
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
}
