import { TestBed } from '@angular/core/testing';

import { UserUpdateService } from './user-update.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { NotificationService } from '../notif/notification.service';
import { environment } from '../../../environments/environment';
import { UserResponse } from '../../models/api/userResponse';

describe('UserUpdateService', () => {
  let service: UserUpdateService;
  let httpMock: HttpTestingController;
  let notificationServiceSpy: jasmine.SpyObj<NotificationService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('NotificationService', ['showSuccess']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserUpdateService,
        { provide: NotificationService, useValue: spy },
      ],
    });

    service = TestBed.inject(UserUpdateService);
    httpMock = TestBed.inject(HttpTestingController);
    notificationServiceSpy = TestBed.inject(
      NotificationService
    ) as jasmine.SpyObj<NotificationService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the update API and show success notification', () => {
    const mockResponse: UserResponse = {
      data: {
        username: 'john.doe',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        roles: [],
      },
      type: 200,
      message: '',
    };
    const firstName = 'John';
    const lastName = 'Doe';
    const email = 'john.doe@example.com';

    service.editUser(firstName, lastName, email).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/user/update`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({ firstName, lastName, email });

    req.flush(mockResponse);

    const message = '';
    expect(notificationServiceSpy.showSuccess).toHaveBeenCalledWith(
      message,
      ''
    );
  });

  it('should handle error response', () => {
    const firstName = 'John';
    const lastName = 'Doe';
    const email = 'john.doe@example.com';

    service.editUser(firstName, lastName, email).subscribe(
      () => fail('should have failed with the 500 error'),
      (error) => {
        expect(error.status).toBe(500);
      }
    );

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/user/update`);
    expect(req.request.method).toBe('PUT');

    req.flush('Something went wrong', {
      status: 500,
      statusText: 'Server Error',
    });
  });
});
