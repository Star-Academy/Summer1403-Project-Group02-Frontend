import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';
import { LoginBody } from '../../models/api/loginBody';
import { LoginResponse } from '../../models/api/loginResponse';
import { of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding requests
    localStorage.clear(); // Clear localStorage after each test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('should check if a user is logged in and update currentUserSubject', () => {
  //   const mockUser: CurrentUser = {
  //     username: 'testuser',
  //     firstName: 'Test',
  //     lastName: 'User',
  //     email: 'testuser@example.com',
  //     roles: [{ roleType: 'Admin' }],
  //   };
  //   localStorage.setItem('savedCurrentUser', JSON.stringify(mockUser));

  //   // Check user via subscription to the observable
  //   service.getCurrentUser().subscribe((user) => {
  //     expect(user).toEqual(mockUser);
  //   });
  // });

  it('should log in a user and store the user data', () => {
    const mockCredentials: LoginBody = {
      username: 'testuser',
      password: 'password',
    };
    const mockResponse: LoginResponse = {
      data: {
        username: 'testuser',
        firstName: 'Test',
        lastName: 'User',
        email: 'testuser@example.com',
        roles: [{ roleType: 'Admin' }],
      },
      type: 200,
      message: 'Login Successful',
    };

    service.loginUser(mockCredentials).subscribe(() => {
      expect(localStorage.getItem('savedCurrentUser')).toEqual(
        JSON.stringify(mockResponse.data)
      );
      service.getCurrentUser().subscribe((user) => {
        expect(user).toEqual(mockResponse.data);
      });
    });

    const req = httpMock.expectOne(
      `${environment.apiBaseUrl}/Authentication/login`
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse); // Simulate a successful response
  });

  it('should handle errors properly when logging in', () => {
    const mockCredentials: LoginBody = {
      username: 'testuser',
      password: 'wrongpassword',
    };
    const mockErrorResponse = { status: 401, statusText: 'Unauthorized' };

    service.loginUser(mockCredentials).subscribe({
      error: (error) => {
        expect(error.message).toBe(
          `Http failure response for ${environment.apiBaseUrl}/Authentication/login: 401 Unauthorized`
        );
      },
    });

    const req = httpMock.expectOne(
      `${environment.apiBaseUrl}/Authentication/login`
    );
    req.flush({}, mockErrorResponse); // Simulate an error response
  });

  it('should log out the user and clear the currentUserSubject', () => {
    spyOn(service['http'], 'post').and.returnValue(of(void 0));

    service.logOutUser().subscribe(() => {
      service.getCurrentUser().subscribe((user) => {
        expect(user).toBeUndefined();
      });
    });

    expect(service['http'].post).toHaveBeenCalledWith(
      `${environment.apiBaseUrl}/Authentication/logout`,
      { withCredentials: true }
    );
  });
});
