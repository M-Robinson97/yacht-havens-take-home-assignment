import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditContractDialogComponent } from './edit-contract-dialog.component';

describe('EditContractDialogComponent', () => {
    let component: EditContractDialogComponent;
    let fixture: ComponentFixture<EditContractDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EditContractDialogComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EditContractDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
