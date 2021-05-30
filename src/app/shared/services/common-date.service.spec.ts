import { TestBed } from '@angular/core/testing';

import { CommonDateService } from './common-date.service';

describe('MomentDateService', () => {
  let service: CommonDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
