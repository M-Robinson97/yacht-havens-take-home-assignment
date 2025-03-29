import { ContractStatus } from '../enums/contract-status.enum';
import { ContractType } from '../enums/contract-type.enum';

/**
 * Represents the key data and operations for a boat contract.
 *
 * Properties:
 *  - id: A unique numeric identifier for the contract.
 *  - contractType: The type/category of the contract (e.g., Resident, Visitor, Temporary).
 *  - contractStatus: The status of the contract (e.g., Active, Completed, Cancelled).
 *  - customerName: The name of the customer holding the contract.
 *  - startDate: The date (YYYY-MM-DD) on which the contract begins.
 *  - endDate: The date (YYYY-MM-DD) on which the contract ends.
 *  - boatName: The name of the boat associated with this contract.
 *  - location: The physical location, slip, or dock name where the boat is kept.
 *  - totalIncVat: The total contract amount, including VAT (value-added tax).
 *  - currency: The currency code (e.g., GBP, USD, EUR) to be used when displaying total amounts.
 */

export class Contract {
    id!: number;
    contractType!: ContractType;
    contractStatus!: ContractStatus;
    customerName!: string;
    startDate!: string;
    endDate!: string;
    boatName!: string;
    location!: string;
    totalIncVat!: number;
    currency!: string;

    constructor(init?: Partial<Contract>) {
        Object.assign(this, init);
    }

    getDurationInDays(): number {
        throw new Error('Not implemented');
    }
}

export interface GetContractsParams {
    status: string;
    contractType: string;
    startDate: string;
    endDate: string;
}
