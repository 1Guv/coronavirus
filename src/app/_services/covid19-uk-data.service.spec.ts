import { TestBed } from '@angular/core/testing';

import { Covid19UKDataService } from './covid19-uk-data.service';

describe('Covid19UKDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Covid19UKDataService = TestBed.get(Covid19UKDataService);
    expect(service).toBeTruthy();
  });
});
