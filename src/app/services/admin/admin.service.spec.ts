import { TestBed } from '@angular/core/testing';

import { AdminUserService } from './admin.service';

describe('AdminService', () => {
  let service: AdminUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
