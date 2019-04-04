import { TestBed } from '@angular/core/testing';

import { MegatableLibService } from './megatable-lib.service';

describe('MegatableLibService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MegatableLibService = TestBed.get(MegatableLibService);
    expect(service).toBeTruthy();
  });
});
