import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EnumView } from 'src/app/models/enum-view.model';
import { ContractStatus } from 'src/app/enums/contract-status.enum';
import { EnumService } from 'src/app/services/enum.service';
import { GetContractsParams } from 'src/app/models/contract.model';
import { Observable } from 'rxjs';
import { ContractType } from 'src/app/enums/contract-type.enum';

@Component({
    selector: 'app-contract-filters',
    templateUrl: './contract-filters.component.html',
    styleUrls: ['./contract-filters.component.scss'],
})
export class ContractFiltersComponent implements OnInit {
    @Output() filtersChanged = new EventEmitter<Partial<GetContractsParams>>();

    public statuses$!: Observable<EnumView<ContractStatus>[]>;
    public contractTypes$!: Observable<EnumView<ContractType>[]>;
    public startDate: string = '';
    public endDate: string = '';

    public form: FormGroup = this.fb.group({});

    constructor(private fb: FormBuilder, 
        private enumService: EnumService) {}

    ngOnInit(): void {
        this.statuses$ = this.enumService.getContractStatuses();
        this.contractTypes$ = this.enumService.getContractTypes();
        this.addControls();
    }

    private addControls(): void {
        this.form = this.fb.group({
            status: [null],
            contractType: [null],
            startDate: [null],
            endDate: [null]
        });
    }

    public applyFilters(): void {
        const { status, contractType, startDate, endDate } = this.form.value;

        this.filtersChanged.emit({
            status: status || undefined,
            contractType: contractType || undefined,
            startDate: startDate || undefined,
            endDate: endDate || undefined
        });
    }

    public removeFilters(): void {
        this.form.reset();
        this.filtersChanged.emit();
    }
}
