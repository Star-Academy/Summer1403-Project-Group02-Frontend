import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ChangePasswordService } from './change-password.service';
import { NotificationService } from '../notif/notification.service';
import { ChangepassResponse } from '../../models/api/changepassResponse';
import { environment } from '../../../environments/environment';

describe('ChangePasswordService', () => {
  let service: ChangePasswordService;
  let httpMock: HttpTestingController;
  let notificationServiceSpy: jasmine.SpyObj<NotificationService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('NotificationService', ['showSuccess']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ChangePasswordService,
        { provide: NotificationService, useValue: spy },
      ],
    });

    service = TestBed.inject(ChangePasswordService);
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

  it('should change password successfully', () => {
    const mockResponse: ChangepassResponse = {
      data: {},
      type: 200,
      message: 'Password changed successfully',
    };
    const previousPassword = 'oldPassword';
    const newPassword = 'newPassword';

    service
      .changePassword(previousPassword, newPassword)
      .subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/user/password`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ previousPassword, newPassword });
    req.flush(mockResponse);

    expect(notificationServiceSpy.showSuccess).toHaveBeenCalled();
  });

  it('should handle error when changing password', () => {
    const previousPassword = 'oldPassword';
    const newPassword = 'newPassword';

    service.changePassword(previousPassword, newPassword).subscribe({
      next: () => fail('should have failed with the 500 error'),
      error: (error) => {
        expect(error.status).toBe(500);
      },
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/user/password`);
    expect(req.request.method).toBe('PATCH');
    req.flush('Something went wrong', {
      status: 500,
      statusText: 'Server Error',
    });

    expect(notificationServiceSpy.showSuccess).not.toHaveBeenCalled();
  });
});
