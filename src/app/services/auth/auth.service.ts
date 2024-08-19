import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { type LoginAPI } from '../../models/api/loginAPI';
import { CurrentUser } from '../../models/current-user';
import { LoginAPIResponse } from '../../models/api/login-apiresponse';

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

  loginUser(credentials: LoginAPI): Observable<LoginAPIResponse> {
    return this.http
      .post<LoginAPIResponse>(
        `${environment.apiBaseUrl}/Authentication/login`,
        credentials
      )
      .pipe(
        tap((response) => {
          if (response) {
            console.log(response);

            const stringifyResponse = JSON.stringify(response.data);
            localStorage.setItem('savedCurrentUser', stringifyResponse);
            this.currentUserSubject.next(response.data);
          }
        }),
        catchError(this.handleError)
      );
  }

  logOutUser(): Observable<void> {
    return this.http
      .post<void>(`${environment.apiBaseUrl}/Authentication/logout`, {})
      .pipe(
        tap(() => {
          localStorage.removeItem('savedCurrentUser');
          this.currentUserSubject.next(undefined);
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 400:
          errorMessage = 'Bad Request. Please check your input.';
          break;
        case 401:
          errorMessage = 'Unauthorized. Incorrect username or password.';
          break;
        case 404:
          errorMessage = 'Not Found. The requested resource does not exist.';
          break;
        case 500:
          errorMessage = 'Internal Server Error. Please try again later.';
          break;
        default:
          errorMessage = `Unexpected Error: ${error.status}. Please try again later.`;
      }
    }

    console.error('HTTP Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
