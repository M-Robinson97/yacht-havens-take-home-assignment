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

@Component({
    selector: 'app-edit-contract-dialog',
    templateUrl: './edit-contract-dialog.component.html',
    styleUrls: ['./edit-contract-dialog.component.scss'],
})
export class EditContractDialogComponent implements OnInit {

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
        this.addControls();
    }

    private addControls(): void {
        this.form.addControl('status', this.fb.control(null));
        this.form.addControl('contractType', this.fb.control(null));
        this.form.addControl('startDate', this.fb.control(null));
        this.form.addControl('endDate', this.fb.control(null));
    }

    private getQuote(): void {
        throw new Error('Method not implemented.');
    }

    public update(): void {
        throw new Error('Method not implemented.');
    }
}
