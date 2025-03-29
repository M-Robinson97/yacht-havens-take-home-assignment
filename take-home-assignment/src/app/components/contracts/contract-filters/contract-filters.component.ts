import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EnumView } from 'src/app/models/enum-view.model';
import { ContractStatus } from 'src/app/enums/contract-status.enum';
import { EnumService } from 'src/app/services/enum.service';
import { GetContractsParams } from 'src/app/models/contract.model';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-contract-filters',
    templateUrl: './contract-filters.component.html',
    styleUrls: ['./contract-filters.component.scss'],
})
export class ContractFiltersComponent implements OnInit {
    @Output() filtersChanged = new EventEmitter<Partial<GetContractsParams>>();

    public statuses$!: Observable<EnumView<ContractStatus>[]>;
    public form: FormGroup = this.fb.group({});

    constructor(private fb: FormBuilder, private enumService: EnumService) {}

    ngOnInit(): void {
        this.statuses$ = this.enumService.getContractStatuses();
        this.addControls();
    }

    private addControls(): void {
        this.form.addControl('status', this.fb.control(null));
    }

    public applyFilters(): void {
        const { status } = this.form.value;

        this.filtersChanged.emit({
            status: status || undefined,
        });
    }
}
