import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AdminUserService } from './admin.service';
import { NotificationService } from '../notif/notification.service';
import { environment } from '../../../environments/environment';
import { AllUserResponse, UserResponse } from '../../models/api/userResponse';
import { User } from '../../models/user';
import { RoleResponse } from '../../models/api/roleResponse';
import { UserBody } from '../../models/api/userBody';
import { EditUserBody } from '../../models/api/editUser';

describe('AdminUserService', () => {
  let service: AdminUserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('NotificationService', ['showSuccess']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AdminUserService,
        { provide: NotificationService, useValue: spy },
      ],
    });

    service = TestBed.inject(AdminUserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch users', () => {
    const dummyUsers: AllUserResponse = {
      type: 200,
      message: '',
      data: [
        {
          username: 'user1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          roles: [{ roleType: 'admin' }],
        },
        {
          username: 'user2',
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@example.com',
          roles: [{ roleType: 'user' }],
        },
      ],
    };

    service.fetchUsers(1).subscribe((users) => {
      expect(users.data.length).toBe(2);
      expect(users.data).toEqual(dummyUsers.data);
    });

    const req = httpMock.expectOne(
      `${environment.apiBaseUrl}/Admin/users?pageNumber=1`
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsers);
  });

  it('should get a user by username', () => {
    const dummyUser: UserResponse = {
      type: 200,
      message: '',
      data: {
        username: 'user1',
        firstName: '',
        lastName: '',
        email: '',
        roles: [],
      },
    };

    service.getUser('user1').subscribe((user) => {
      expect(user.data.username).toBe('user1');
    });

    const req = httpMock.expectOne(
      `${environment.apiBaseUrl}/Admin/users/user1`
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyUser);
  });

  it('should create a new user', () => {
    const newUser: User = {
      username: 'newUser',
      firstName: 'FirstName',
      lastName: 'LastName',
      email: 'newuser@example.com',
      roles: [],
    };
    const userBody: UserBody = {
      username: 'newUser',
      password: 'password',
      firstName: 'FirstName',
      lastName: 'LastName',
      email: 'newuser@example.com',
      roles: [],
    };

    service.createUser(userBody).subscribe((user) => {
      expect(user.username).toBe('newUser');
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/Admin/users`);
    expect(req.request.method).toBe('POST');
    req.flush(newUser);
  });

  it('should delete a user by username', () => {
    service.deleteUser('user1').subscribe();

    const req = httpMock.expectOne(
      `${environment.apiBaseUrl}/Admin/users/user1`
    );
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should fetch roles', () => {
    const dummyRoles: RoleResponse = {
      data: [{ roleType: 'admin' }, { roleType: 'user' }],
      type: 0,
      message: '',
    };

    service.fetchRoles().subscribe((roles) => {
      expect(roles.data.length).toBe(2);
      expect(roles.data).toEqual(dummyRoles.data);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/Admin/roles`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyRoles);
  });

  it('should add a role to a user', () => {
    service.addRoleToUser('user1', 'admin').subscribe();

    const req = httpMock.expectOne(
      `${environment.apiBaseUrl}/Admin/users/user1/roles`
    );
    expect(req.request.method).toBe('PUT');
    req.flush({});
  });

  it('should remove a role from a user', () => {
    service.removeRoleFromUser('user1', 'admin').subscribe();

    const req = httpMock.expectOne(
      `${environment.apiBaseUrl}/Admin/users/user1/roles/admin`
    );
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should update a user', () => {
    const updatedUser: UserResponse = {
      data: {
        username: 'updatedUser',
        firstName: '',
        lastName: '',
        email: '',
        roles: [],
      },
      type: 0,
      message: '',
    };
    const editUserBody: EditUserBody = {
      email: 'updated@example.com',
      firstName: '',
      lastName: '',
    };

    service.updateUser('user1', editUserBody).subscribe((user) => {
      expect(user.data.username).toBe('updatedUser');
    });

    const req = httpMock.expectOne(
      `${environment.apiBaseUrl}/Admin/users/update/user1`
    );
    expect(req.request.method).toBe('PUT');
    req.flush(updatedUser);
  });
});
