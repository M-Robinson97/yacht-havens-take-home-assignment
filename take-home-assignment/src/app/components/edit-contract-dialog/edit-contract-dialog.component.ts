import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditContractDialogData } from './edit-contract-dialog.component.model';
import { QuoteService } from 'src/app/services/quote.service';

@Component({
    selector: 'app-edit-contract-dialog',
    templateUrl: './edit-contract-dialog.component.html',
    styleUrls: ['./edit-contract-dialog.component.scss'],
})
export class EditContractDialogComponent implements OnInit {
    constructor(
        @Inject(MAT_DIALOG_DATA)
        private data: EditContractDialogData,
        private dialogRef: MatDialogRef<EditContractDialogComponent>,
        private quoteService: QuoteService
    ) {}

    ngOnInit(): void {}

    private getQuote(): void {
        throw new Error('Method not implemented.');
    }

    public update(): void {
        throw new Error('Method not implemented.');
    }
}
