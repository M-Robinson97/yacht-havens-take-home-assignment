import { Component, ViewChild } from '@angular/core';
import { ContractListComponent } from './contract-list/contract-list.component';
import { GetContractsParams } from 'src/app/models/contract.model';

@Component({
    selector: 'app-contracts',
    templateUrl: './contracts.component.html',
    styleUrls: ['./contracts.component.scss'],
})
export class ContractsComponent {
    @ViewChild(ContractListComponent) listComponent!: ContractListComponent;

    public applyFilters(filters: Partial<GetContractsParams> = {}): void {
        if (this.listComponent) {
            this.listComponent.fetchContracts(filters);
        }
    }
}
