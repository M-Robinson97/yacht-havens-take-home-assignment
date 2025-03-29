import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ContractType } from 'src/app/enums/contract-type.enum';

@Component({
    selector: 'app-contract-type-cell-renderer',
    templateUrl: './contract-type-cell-renderer.component.html',
    styleUrls: ['./contract-type-cell-renderer.component.scss'],
})
export class ContractTypeCellRendererComponent implements ICellRendererAngularComp {
    public label: string = '';
    public displayColour: string = '';
    public colour: string = '';

    agInit(params: ICellRendererParams): void {
        this.updateDisplay(params.value);
    }

    refresh(params: ICellRendererParams): boolean {
        this.updateDisplay(params.value);
        return true;
    }

    private updateDisplay(contractType: ContractType): void {
        if (!contractType) return;

        switch (contractType) {
            case ContractType.Resident:
                this.label = 'Resident';
                this.displayColour = '#023257';
                this.colour = '#FFFFFF';
                break;
            case ContractType.Visitor:
                this.label = 'Visitor';
                this.displayColour = '#78CAA2';
                this.colour = '#FFFFFF';
                break;
            case ContractType.Seasonal:
                this.label = 'Seasonal';
                this.displayColour = '#DBE068';
                this.colour = '#555a00';
                break;
            default:
                this.label = 'Unknown';
                this.displayColour = '#999';
        }
    }
}
