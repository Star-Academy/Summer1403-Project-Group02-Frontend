import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ChangepassResponse } from '../../models/api/changepassResponse';
import { NotificationService } from '../notif/notification.service';
import { SUCCESS_MESSAGES_MAP } from '../../constants/success-messages';

@Injectable({
  providedIn: 'root',
})
export class ChangePasswordService {
  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) {}

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
      .pipe(
        tap({
          next: () => {
            const message = SUCCESS_MESSAGES_MAP.get(
              'Password Changed Successfully'
            );
            this.notificationService.showSuccess(
              message?.message ?? '',
              message?.label ?? ''
            );
          },
        })
      );
  }
}
