import { TestBed } from '@angular/core/testing';

import { AdminEditUserService } from './admin-edit-user.service';
import { User } from '../../models/user';

describe('AdminEditUserService', () => {
  let service: AdminEditUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminEditUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get user', () => {
    const user: User = {
      username: 'Admin',
      firstName: 'Name',
      lastName: 'Family',
      email: 'admin@admin.admin',
      roles: [{ roleType: 'Admin' }],
    };

    service.setUser(user);
    expect(service.getUser()).toEqual(user);
  });
});
