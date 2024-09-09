import { TestBed } from '@angular/core/testing';

import { DataGroupService } from './data-group.service';

describe('DataGroupService', () => {
  let service: DataGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
