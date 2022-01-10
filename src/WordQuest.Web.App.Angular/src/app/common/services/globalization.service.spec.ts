import { TestBed } from '@angular/core/testing';

import { GlobalizationService } from './globalization.service';

describe('GlobalizationService', () => {
  let service: GlobalizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
