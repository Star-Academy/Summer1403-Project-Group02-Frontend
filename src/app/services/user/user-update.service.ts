import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NotificationService } from '../notif/notification.service';
import { SUCCESS_MESSAGES_MAP } from '../../constants/success-messages';
import { UserResponse } from '../../models/api/userResponse';

@Injectable({
  providedIn: 'root',
})
export class UserUpdateService {
  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) {}

  editUser(
    firstName: string,
    lastName: string,
    email: string
  ): Observable<UserResponse> {
    const url = `${environment.apiBaseUrl}/user/update`;
    const body = {
      firstName: firstName,
      lastName: lastName,
      email: email,
    };

    return this.http
      .put<UserResponse>(url, body, {
        withCredentials: true,
      })
      .pipe(
        tap({
          next: () => {
            const message = SUCCESS_MESSAGES_MAP.get(
              'Basic Info Changed Successfully'
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
