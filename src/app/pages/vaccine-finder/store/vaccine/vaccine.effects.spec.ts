import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { VaccineEffects } from './vaccine.effects';

describe('VaccineEffects', () => {
  let actions$: Observable<any>;
  let effects: VaccineEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        VaccineEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(VaccineEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
