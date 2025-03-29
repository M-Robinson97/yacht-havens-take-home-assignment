import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid-community';

@Component({
  selector: 'app-delete-action-cell-renderer',
  templateUrl: './delete-action-cell-renderer.component.html',
  styleUrls: ['./delete-action-cell-renderer.component.scss']
})
export class DeleteActionCellRendererComponent implements ICellRendererAngularComp {

  constructor() { }
  refresh(params: any): boolean {
    console.log('refresh delete cell renderer');
    return true;
  }
  
  agInit(params: ICellRendererParams): void {
    console.log('init delete cell renderer');
  }
}
