import { TestBed } from '@angular/core/testing';

import { DataGroupResolverService } from './data-group-resolver.service';

describe('DataGroupResolverService', () => {
  let service: DataGroupResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataGroupResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
