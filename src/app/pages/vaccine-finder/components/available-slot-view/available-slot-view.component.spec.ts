import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableSlotViewComponent } from './available-slot-view.component';

describe('AvailableSlotViewComponent', () => {
  let component: AvailableSlotViewComponent;
  let fixture: ComponentFixture<AvailableSlotViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableSlotViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableSlotViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
