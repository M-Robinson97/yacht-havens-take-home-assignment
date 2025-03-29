import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractStatusCellRendererComponent } from './contract-status-cell-renderer.component';

describe('ContractStatusCellRendererComponent', () => {
  let component: ContractStatusCellRendererComponent;
  let fixture: ComponentFixture<ContractStatusCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractStatusCellRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractStatusCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
