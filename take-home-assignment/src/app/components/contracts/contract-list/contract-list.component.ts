import { Component, HostListener, OnInit } from '@angular/core';
import { ContractsService } from 'src/app/services/contracts.service';
import { Contract, GetContractsParams } from 'src/app/models/contract.model';
import { ColDef, GridApi, GridOptions, GridReadyEvent, RowDataChangedEvent } from 'ag-grid-community';
import { ContractTypeCellRendererComponent } from '../cell-renderers/contract-type-cell-renderer/contract-type-cell-renderer.component';
import { MatDialog } from '@angular/material/dialog';
import { EditContractDialogComponent } from '../../edit-contract-dialog/edit-contract-dialog.component';
import { DeleteActionCellRendererComponent } from '../cell-renderers/delete-action-cell-renderer/delete-action-cell-renderer.component';
import { DateService } from 'src/app/services/date.service';
import { ContractStatusCellRendererComponent } from '../cell-renderers/contract-status-cell-renderer/contract-status-cell-renderer.component';

@Component({
    selector: 'app-contract-list',
    templateUrl: './contract-list.component.html',
    styleUrls: ['./contract-list.component.scss'],
})
export class ContractListComponent implements OnInit {
    public contracts: Contract[] = [];
    public columnDefs: ColDef[] = this.createColumnDefs();
    public gridOptions: GridOptions = this.getGridOptions();
    private gridApi!: GridApi;

    constructor(private contractsService: ContractsService, private dialog: MatDialog,
        private dateService: DateService
    ) {}

    ngOnInit(): void {}

    public fetchContracts(filters: Partial<GetContractsParams> = {}): void {
        this.gridApi.showLoadingOverlay();
        this.contractsService.getContracts(filters).subscribe((data) => {
            this.contracts = data;
            this.gridApi.hideOverlay();
        });
    }

    private getGridOptions(): GridOptions {
        return {
            enableSorting: true,
            enableFilter: true,
            suppressMenuHide: true,
            suppressMovableColumns: true,
            rowHeight: 40,
            headerHeight: 50,
            animateRows: true,
            context: { componentParent: this },
            onGridReady: (params: GridReadyEvent) => this.onGridReady(params),
            onRowDataChanged: (params: RowDataChangedEvent) => params.api.sizeColumnsToFit(),
            onRowClicked: (event) => this.openEditDialog(event.data),
        };
    }

    private onGridReady(params: GridReadyEvent): void {
        this.gridApi = params.api;
        this.fetchContracts();
    }

    private openEditDialog(contract: Contract): void {
        this.dialog.open(EditContractDialogComponent, {
            data: { contract },
            width: '600px',
        });
    }

    private createColumnDefs(): ColDef[] {
        return [
            {
                field: 'contractType',
                headerName: 'Type',
                cellRendererFramework: ContractTypeCellRendererComponent,
                minWidth: 120,
                width: 120,
                maxWidth: 120
            },
            {
                field: 'contractStatus',
                headerName: 'Contract Status',
                cellRendererFramework: ContractStatusCellRendererComponent
            },
            {
                field: 'customerName',
                headerName: 'Customer Name',
                valueGetter: 'data.customerName',
            },
            {
                field: 'boatName',
                headerName: 'Boat Name',
                valueGetter: 'data.boatName',
            },
            {
                field: 'location',
                headerName: 'Location',
                valueGetter: 'data.location',
            },
            {
                field: 'startDate',
                headerName: 'Start Date',
                valueGetter: (params) => {
                    return new Date(params.data.startDate);
                },
                cellRenderer: (params) => {
                    return this.dateService.formatDateToText(params.data.startDate)
                },
                filter: 'agDateColumnFilter'
            },
            {
                field: 'endDate',
                headerName: 'End Date',
                valueGetter: (params) => {
                    return new Date(params.data.endDate);
                }, 
                cellRenderer: (params) => {
                    return this.dateService.formatDateToText(params.data.endDate)
                },
                filter: 'agDateColumnFilter'
            },
            {
                field: 'durationInDays',
                headerName: 'Duration in Days',
                valueGetter: (params) => {
                    const startDate = params.data.startDate;
                    const endDate = params.data.endDate;
                    return this.dateService.getContractDurationInDays(startDate, endDate);
                },
                filter: 'agNumberColumnFilter'
            },
            {
                field: 'totalIncVat',
                headerName: 'Total Inc VAT',
                valueGetter:  'data.totalIncVat',   
                cellRenderer: (params) => {
                    const contractCurrency = params.data.currency;
                    const formattedVatAmount = Intl.NumberFormat('en-US', { style: 'currency', currency: contractCurrency}).format(params.data.totalIncVat);
                    return formattedVatAmount;
                },
                filter: 'agNumberColumnFilter'
            },
            {
                field: 'deleteAction',
                headerName: 'Delete',
                cellRendererFramework: DeleteActionCellRendererComponent,
                suppressFilter: true,
                suppressSorting: true
            }
            
        ];
    }

    @HostListener('window:resize', ['$event'])
    onResize() {
        if (this.gridApi) {
            this.gridApi.sizeColumnsToFit();
        }
    }
}
