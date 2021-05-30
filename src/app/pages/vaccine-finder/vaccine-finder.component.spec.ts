import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccineFinderComponent } from './vaccine-finder.component';

describe('VaccineFinderComponent', () => {
  let component: VaccineFinderComponent;
  let fixture: ComponentFixture<VaccineFinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccineFinderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccineFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
