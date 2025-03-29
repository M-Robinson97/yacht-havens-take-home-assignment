import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractTypeCellRendererComponent } from './contract-type-cell-renderer.component';

describe('ContractTypeCellRendererComponent', () => {
    let component: ContractTypeCellRendererComponent;
    let fixture: ComponentFixture<ContractTypeCellRendererComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ContractTypeCellRendererComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ContractTypeCellRendererComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
