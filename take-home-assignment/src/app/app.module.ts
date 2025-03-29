import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ContractsComponent } from './components/contracts/contracts.component';
import { ContractFiltersComponent } from './components/contracts/contract-filters/contract-filters.component';
import { ContractListComponent } from './components/contracts/contract-list/contract-list.component';
import { MatIconModule } from '@angular/material/icon';
import { ContractTypeCellRendererComponent } from './components/contracts/cell-renderers/contract-type-cell-renderer/contract-type-cell-renderer.component';
import { EditContractDialogComponent } from './components/edit-contract-dialog/edit-contract-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
    declarations: [
        AppComponent,
        ContractsComponent,
        ContractFiltersComponent,
        ContractListComponent,
        ContractTypeCellRendererComponent,
        EditContractDialogComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        AgGridModule.withComponents([]),
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
        MatDialogModule,
        MatToolbarModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
