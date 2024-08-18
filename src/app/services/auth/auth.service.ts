import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginAPI } from '../../models/api/loginAPI';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<string | undefined>(
    undefined
  );

  constructor(private http: HttpClient) {
    this.checkIfUserIsLoggedIn();
  }

  getCurrentUser(): Observable<string | undefined> {
    return this.currentUserSubject.asObservable();
  }

  private checkIfUserIsLoggedIn(): void {
    const savedUsername = localStorage.getItem('currentUser');
    if (savedUsername) {
      this.currentUserSubject.next(savedUsername);
    }
  }

  loginUser(credentials: LoginAPI): Observable<string> {
    return this.http
      .post<any>(`${environment.apiBaseUrl}/Authentication/login`, credentials)
      .pipe(
        tap((response) => {
          if (response) {
            console.log(response);
            localStorage.setItem('currentUser', credentials.username);
            this.currentUserSubject.next(credentials.username);
          }
        }),
        catchError(this.handleError)
      );
  }

  logOut(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(undefined);
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
