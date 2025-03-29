import { ContractType } from '../enums/contract-type.enum';

export interface GetQuoteParams {
    contractType: ContractType;
    startDate: string;
    endDate: string;
}
