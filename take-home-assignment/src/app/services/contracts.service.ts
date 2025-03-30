import { Injectable } from '@angular/core';
import { Contract, GetContractsParams } from '../models/contract.model';
import { of, Observable, from } from 'rxjs';
import { delay, filter, map, mergeMap, toArray } from 'rxjs/operators';
import { contracts } from '../data/contracts';
import { DateService } from './date.service';

@Injectable({
    providedIn: 'root',
})
export class ContractsService {
    private contracts: Contract[] = contracts;

    constructor(private dateService: DateService) {}

    public getContracts(params: Partial<GetContractsParams> = {}): Observable<Contract[]> {
        const { status, contractType, startDate, endDate } = params;

        return of(this.contracts).pipe(
            delay(1000),
            mergeMap((contracts) => from(contracts)),
            filter((contract) =>  
                this.filterByStatus(contract, status)
                && this.filterByContractType(contract, contractType)
                && this.filterByStartDate(contract, startDate)
                && this.filterByEndDate(contract, endDate)
            ),
            toArray()
        );
    }

    public updateContract(updateContract: Contract): Observable<void> {
        return of(null).pipe(
            delay(1000),
            map(() => {
                const index = this.contracts.findIndex(contract => contract.id === updateContract.id);
                if (index !== -1) {
                    this.contracts[index] = updateContract;
                } else {
                    console.log(`Contract ID #${updateContract.id} not found.`);
                }
            })
        );
    }

    public deleteContract(id: number): Observable<void> {
        return of(null).pipe(
            delay(1000),
            map(() => {
                this.contracts = this.contracts.filter((c) => c.id !== id);
            })
        );
    }

    private filterByStatus(contract: Contract, status?: string): boolean {
        if (!status) return true;
        return contract.contractStatus === status;
    }

    private filterByContractType(contract: Contract, contractType?: string): boolean {
        if (!contractType) return true;
        return contract.contractType === contractType;
    }

    private filterByStartDate(contract: Contract, startDate?: string): boolean {
        if (!startDate) return true;

        return this.dateService.compareStringsByDay(startDate, contract.startDate);
    }

    private filterByEndDate(contract: Contract, endDate?: string): boolean {
        if (!endDate) return true;

        return this.dateService.compareStringsByDay(endDate, contract.endDate);
    }
}
