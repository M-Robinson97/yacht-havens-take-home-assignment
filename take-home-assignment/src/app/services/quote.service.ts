import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { GetQuoteParams } from '../models/quote.model';
import { ContractType } from '../enums/contract-type.enum';

import * as moment from 'moment';

@Injectable({
    providedIn: 'root',
})
export class QuoteService {
    constructor() {}

    public getQuote(params: GetQuoteParams): Observable<number> {
        if (!this.isValidDateRange(params.startDate, params.endDate)) {
            return of(0).pipe(delay(500));
        }

        const duration = this.getContractDuration(params.startDate, params.endDate);
        const dailyRate = this.getDailyRate(params.contractType);
        const totalValue = this.calculateTotalValue(dailyRate, duration);

        return of(totalValue).pipe(delay(1000));
    }

    private isValidDateRange(startDate: string, endDate: string): boolean {
        const start = moment(startDate);
        const end = moment(endDate);
        return start.isValid() && end.isValid() && end.isAfter(start, 'day');
    }

    private getContractDuration(startDate: string, endDate: string): number {
        return moment(endDate).diff(moment(startDate), 'days');
    }

    private getDailyRate(contractType: ContractType): number {
        switch (contractType) {
            case ContractType.Resident:
                return 50;
            case ContractType.Visitor:
                return 75;
            case ContractType.Seasonal:
                return 100;
            default:
                return 0;
        }
    }

    private calculateTotalValue(dailyRate: number, duration: number): number {
        return dailyRate * duration;
    }
}
