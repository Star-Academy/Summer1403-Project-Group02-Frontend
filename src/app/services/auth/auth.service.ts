import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { type LoginBody } from '../../models/api/loginBody';
import { CurrentUser } from '../../models/current-user';
import { LoginResponse } from '../../models/api/loginResponse';
import { LogoutResponse } from '../../models/api/logoutResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<CurrentUser | undefined>(
    undefined
  );

  constructor(private http: HttpClient) {
    this.checkIfUserIsLoggedIn();
  }

  getCurrentUser(): Observable<CurrentUser | undefined> {
    return this.currentUserSubject.asObservable();
  }

  private checkIfUserIsLoggedIn(): void {
    const savedCurrentUser = localStorage.getItem('savedCurrentUser');
    if (savedCurrentUser) {
      const parsedUser: CurrentUser = JSON.parse(savedCurrentUser);
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
        tap(() => {
          localStorage.removeItem('savedCurrentUser');
          this.currentUserSubject.next(undefined);
        })
      );
  }
}
