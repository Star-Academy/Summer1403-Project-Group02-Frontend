import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { NotificationService } from '../notif/notification.service';
import { ERROR_MESSAGES_MAP } from '../../constants/error-messages';

/**
 * The `HttpErrorInterceptor` automatically handles errors from API calls, retries requests, and displays user-friendly messages.
 */
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private notificationService: NotificationService) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        const backendErrorMessage = error.error?.message;
        this.showNotification(backendErrorMessage);
        return throwError(() => new Error(backendErrorMessage));
      })
    );
  }

  private showNotification(backendErrorMessage: string) {
    const notification = ERROR_MESSAGES_MAP.get(backendErrorMessage);

    if (notification) {
      this.notificationService.showError(
        notification.message,
        notification.label
      );
    } else {
      this.notificationService.showError(
        'Unknown Error',
        'An unexpected error occurred. Please try again later.'
      );
    }
  }
}
