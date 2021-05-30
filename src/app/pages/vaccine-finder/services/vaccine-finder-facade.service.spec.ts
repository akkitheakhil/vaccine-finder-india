import { TestBed } from '@angular/core/testing';

import { VaccineFinderFacadeService } from './vaccine-finder-facade.service';

describe('VaccineFinderFacadeService', () => {
  let service: VaccineFinderFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VaccineFinderFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
