import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LoginBody } from '../../models/api/loginBody';
import { User } from '../../models/user';
import { LoginResponse } from '../../models/api/loginResponse';
import { LogoutResponse } from '../../models/api/logoutResponse';
import { NotificationService } from '../notif/notification.service';
import { SUCCESS_MESSAGES_MAP } from '../../constants/success-messages';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | undefined>(undefined); // Use BehaviorSubject

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.checkIfUserIsLoggedIn();
    console.log('checked');
  }

  getCurrentUser(): Observable<User | undefined> {
    return this.currentUserSubject.asObservable();
  }

  checkIfUserIsLoggedIn(): Promise<void> {
    return new Promise((resolve) => {
      const savedCurrentUser = localStorage.getItem('savedCurrentUser');
      if (savedCurrentUser) {
        this.http
          .get<{ data: string; type: number; message: string }>(
            `${environment.apiBaseUrl}/Authentication`,
            { withCredentials: true }
          )
          .subscribe({
            next: (response) => {
              if (response.data) {
                this.currentUserSubject.next(JSON.parse(savedCurrentUser));
              } else {
                this.logOutUser();
              }
              resolve();
            },
            error: () => {
              this.logOutUser();
              resolve();
            },
          });
      } else {
        resolve();
      }
    });
  }

  loginUser(credentials: LoginBody): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(
        `${environment.apiBaseUrl}/Authentication/login`,
        credentials,
        { withCredentials: true }
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
            this.router.navigate(['/login']);
          },
        })
      );
  }
}
