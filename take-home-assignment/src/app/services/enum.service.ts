import { Injectable } from '@angular/core';
import { ContractStatus } from '../enums/contract-status.enum';
import { ContractType } from '../enums/contract-type.enum';
import { EnumView } from '../models/enum-view.model';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class EnumService {
    public getContractStatuses(): Observable<EnumView<ContractStatus>[]> {
        const statuses = Object.values(ContractStatus);
        return of(statuses.map((status, index) => new EnumView<ContractStatus>(index, status))).pipe(delay(1000));
    }

    public getContractTypes(): Observable<EnumView<ContractType>[]> {
        const types = Object.values(ContractType);
        return of(types.map((type, index) => new EnumView<ContractType>(index, type))).pipe(delay(1000));
    }
}
