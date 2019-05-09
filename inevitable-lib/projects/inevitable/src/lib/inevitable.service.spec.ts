import { TestBed } from '@angular/core/testing';

import { InevitableService } from './inevitable.service';

describe('InevitableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InevitableService = TestBed.get(InevitableService);
    expect(service).toBeTruthy();
  });
});
