import { Component, HostListener, OnInit } from '@angular/core';
import { ContractsService } from 'src/app/services/contracts.service';
import { Contract, GetContractsParams } from 'src/app/models/contract.model';
import { ColDef, GridApi, GridOptions, GridReadyEvent, RowDataChangedEvent } from 'ag-grid-community';
import { ContractTypeCellRendererComponent } from '../cell-renderers/contract-type-cell-renderer/contract-type-cell-renderer.component';
import { MatDialog } from '@angular/material/dialog';
import { EditContractDialogComponent } from '../../edit-contract-dialog/edit-contract-dialog.component';
import { DeleteActionCellRendererComponent } from '../cell-renderers/delete-action-cell-renderer/delete-action-cell-renderer.component';
import { DateService } from 'src/app/services/date.service';

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
                maxWidth: 120,
                suppressFilter: true,
            },
            {
                field: 'contractStatus',
                headerName: 'Contract Status',
                valueGetter: 'data.contractStatus',
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
                    return this.dateService.formatDateToString(params.data.startDate)
                },
            },
            {
                field: 'endDate',
                headerName: 'End Date',
                valueGetter: (params) => {
                    return this.dateService.formatDateToString(params.data.endDate)
                },
            },
            {
                field: 'durationInDays',
                headerName: 'Duration in Days',
                valueGetter: (params) => {
                    const startDate = params.data.startDate;
                    const endDate = params.data.endDate;
                    return this.dateService.getContractDurationInDays(startDate, endDate);
                }
            },
            {
                field: 'totalIncVat',
                headerName: 'Total Inc VAT',
                valueGetter: (params) => {
                    const contractCurrency = params.data.currency;
                    const formattedVatAmount = Intl.NumberFormat('en-US').format(params.data.totalIncVat);
                    return `${contractCurrency} ${formattedVatAmount}`
                }
            },
            {
                field: 'deleteAction',
                headerName: 'Delete',
                cellRendererFramework: DeleteActionCellRendererComponent,
                suppressFilter: true,
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
