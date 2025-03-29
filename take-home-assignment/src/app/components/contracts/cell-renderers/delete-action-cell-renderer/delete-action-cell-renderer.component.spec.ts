import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteActionCellRendererComponent } from './delete-action-cell-renderer.component';

describe('DeleteActionCellRendererComponent', () => {
  let component: DeleteActionCellRendererComponent;
  let fixture: ComponentFixture<DeleteActionCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteActionCellRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteActionCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
