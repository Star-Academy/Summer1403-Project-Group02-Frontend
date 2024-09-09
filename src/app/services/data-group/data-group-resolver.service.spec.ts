import { TestBed } from '@angular/core/testing';

import { DataGroupResolver } from './data-group-resolver.service';

describe('DataGroupResolver', () => {
  let service: DataGroupResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataGroupResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
