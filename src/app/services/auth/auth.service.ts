import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { type LoginBody } from '../../models/api/loginBody';
import { User } from '../../models/user';
import { LoginResponse } from '../../models/api/loginResponse';
import { LogoutResponse } from '../../models/api/logoutResponse';
import { NotificationService } from '../notif/notification.service';
import { SUCCESS_MESSAGES_MAP } from '../../constants/success-messages';
import { UserResponse } from '../../models/api/userResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | undefined>(undefined);

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) {
    this.checkIfUserIsLoggedIn();
  }

  getCurrentUser(): Observable<User | undefined> {
    return this.currentUserSubject.asObservable();
  }

  loadCurrentUser() {
    this.http
      .get<UserResponse>(`${environment.apiBaseUrl}/Authentication`, {
        withCredentials: true,
      })
      .subscribe((user) => {
        this.currentUserSubject.next(user.data);
      });
  }

  private checkIfUserIsLoggedIn(): void {
    const savedCurrentUser = localStorage.getItem('savedCurrentUser');
    if (savedCurrentUser) {
      const parsedUser: User = JSON.parse(savedCurrentUser);
      this.currentUserSubject.next(parsedUser);
    }
  }

  loginUser(credentials: LoginBody): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(
        `${environment.apiBaseUrl}/Authentication/login`,
        credentials,
        {
          withCredentials: true,
        }
      )
      .pipe(
        tap((response) => {
          if (response) {
            const stringifyResponse = JSON.stringify(response.data);
            localStorage.setItem('savedCurrentUser', stringifyResponse);
            this.currentUserSubject.next(response.data);
            const message = SUCCESS_MESSAGES_MAP.get('Login Successfully');
            this.notificationService.showSuccess(
              message?.message ?? '',
              message?.label ?? ''
            );
          }
        })
      );
  }

  logOutUser(): Observable<LogoutResponse> {
    return this.http
      .post<LogoutResponse>(`${environment.apiBaseUrl}/Authentication/logout`, {
        withCredentials: true,
      })
      .pipe(
        tap({
          next: () => {
            localStorage.removeItem('savedCurrentUser');
            this.currentUserSubject.next(undefined);
            const message = SUCCESS_MESSAGES_MAP.get('Logout Successfully');
            this.notificationService.showSuccess(
              message?.message ?? '',
              message?.label ?? ''
            );
          },
        })
      );
  }
}
