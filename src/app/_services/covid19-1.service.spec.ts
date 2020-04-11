import { TestBed } from '@angular/core/testing';

import { Covid191Service } from './covid19-1.service';

describe('Covid191Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Covid191Service = TestBed.get(Covid191Service);
    expect(service).toBeTruthy();
  });
});
