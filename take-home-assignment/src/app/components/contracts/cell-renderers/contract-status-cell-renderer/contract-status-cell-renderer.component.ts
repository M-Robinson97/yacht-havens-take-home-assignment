import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ContractStatus } from 'src/app/enums/contract-status.enum';

@Component({
  selector: 'app-contract-status-cell-renderer',
  templateUrl: './contract-status-cell-renderer.component.html',
  styleUrls: ['./contract-status-cell-renderer.component.scss']
})
export class ContractStatusCellRendererComponent implements ICellRendererAngularComp {

  public contractStatus: string = '';
  public iconName: string = '';
  
  constructor() { }
  
  refresh(params: any): boolean {
    this.setStatus(params.data.contractStatus);
    return true;
  }

  agInit(params: ICellRendererParams): void {
    this.setStatus(params.data.contractStatus);
  }

  private setStatus(contractStatus: ContractStatus): void {
          if (!contractStatus) return;
          this.contractStatus = contractStatus;
          switch (contractStatus) {
              case ContractStatus.Active:
                  this.iconName = 'autorenew';
                  break;
              case ContractStatus.Cancelled:
                  this.iconName = 'cancel';
                  break;
              case ContractStatus.Completed:
                  this.iconName = 'done';
                  break;
              case ContractStatus.Initial:
                  this.iconName = 'chat_bubble';
                  break;
              default:
                  this.iconName = '';
          }
      }
}
