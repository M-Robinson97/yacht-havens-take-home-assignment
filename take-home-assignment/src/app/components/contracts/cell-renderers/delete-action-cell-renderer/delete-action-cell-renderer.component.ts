import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ContractsService } from 'src/app/services/contracts.service';

@Component({
  selector: 'app-delete-action-cell-renderer',
  templateUrl: './delete-action-cell-renderer.component.html',
  styleUrls: ['./delete-action-cell-renderer.component.scss']
})
export class DeleteActionCellRendererComponent implements ICellRendererAngularComp {
  params!: ICellRendererParams;

  constructor(private contractsService: ContractsService) { }

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams ): boolean {
    // This method is not currently needed
    return true;
  }

  deleteContract() {
    const gridApi = this.params.api;
    const rowNode = this.params.node;

    if (confirm(`Are you sure you want to delete the contract for ${this.params.data.customerName}?`)) {
      this.contractsService.deleteContract(this.params.data.id).subscribe({
        next: () => {
          alert('Contract deleted');
          gridApi.removeItems([rowNode]);
        },
        error: (err) => {
          alert('There was a problem deleting the contract');
          console.error(err);
        }
      });
    }
  }
}
