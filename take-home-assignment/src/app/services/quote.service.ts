import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { GetQuoteParams } from '../models/quote.model';
import { ContractType } from '../enums/contract-type.enum';

import * as moment from 'moment';
import { DateService } from './date.service';

@Injectable({
    providedIn: 'root',
})
export class QuoteService {
    constructor(private dateService: DateService) {}

    public getQuote(params: GetQuoteParams): Observable<number> {
        if (!this.dateService.isValidDateRange(params.startDate, params.endDate)) {
            return of(0).pipe(delay(500));
        }

        const duration = this.dateService.getContractDurationInDays(params.startDate, params.endDate);
        const dailyRate = this.getDailyRate(params.contractType);
        const totalValue = this.calculateTotalValue(dailyRate, duration);

        return of(totalValue).pipe(delay(1000));
    }

    public formatQuoteWithCurrency(currency: string, quote: number): string {
        return Intl.NumberFormat('en-Uk', { style: 'currency', currency: currency}).format(quote);
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
