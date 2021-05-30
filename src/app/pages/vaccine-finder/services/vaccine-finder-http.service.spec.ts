import { TestBed } from '@angular/core/testing';

import { VaccineFinderHttpService } from './vaccine-finder-http.service';

describe('VaccineFinderHttpService', () => {
  let service: VaccineFinderHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VaccineFinderHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
