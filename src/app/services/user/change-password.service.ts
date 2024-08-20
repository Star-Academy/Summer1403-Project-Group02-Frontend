import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ChangepassResponse } from '../../models/api/changepassResponse';

@Injectable({
  providedIn: 'root',
})
export class ChangePasswordService {
  constructor(private http: HttpClient) {}

  changePassword(
    previousPassword: string,
    newPassword: string
  ): Observable<ChangepassResponse> {
    const url = `${environment.apiBaseUrl}/user/password`;
    const body = {
      previousPassword: previousPassword,
      newPassword: newPassword,
    };

    return this.http
      .patch<ChangepassResponse>(url, body, {
        withCredentials: true,
      })
      .pipe(catchError(this.handleError));
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
          errorMessage = 'Unauthorized.';
          break;
        case 404:
          errorMessage = 'Not Found. The user does not exist.';
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
