import { Injectable } from '@angular/core';
import { Contract, GetContractsParams } from '../models/contract.model';
import { of, Observable, from } from 'rxjs';
import { delay, filter, map, mergeMap, toArray } from 'rxjs/operators';
import { contracts } from '../data/contracts';

@Injectable({
    providedIn: 'root',
})
export class ContractsService {
    private contracts: Contract[] = contracts;

    constructor() {}

    public getContracts(params: Partial<GetContractsParams> = {}): Observable<Contract[]> {
        const { status } = params;

        return of(this.contracts).pipe(
            delay(1000),
            mergeMap((contracts) => from(contracts)),
            filter((contract) => this.filterByStatus(contract, status)),
            toArray()
        );
    }

    private filterByStatus(contract: Contract, status?: string): boolean {
        if (!status) return true;
        return contract.contractStatus === status;
    }

    public deleteContract(id: number): Observable<void> {
        return of(null).pipe(
            delay(1000),
            map(() => {
                this.contracts = this.contracts.filter((c) => c.id !== id);
            })
        );
    }
}
