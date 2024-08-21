import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { UserResponse } from '../../models/api/userResponse';
import { NotificationService } from '../notif/notification.service';
import { SUCCESS_MESSAGES_MAP } from '../../constants/success-messages';

@Injectable({
  providedIn: 'root',
})
export class GetUsersService {
  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) {}

  getUsers(): Observable<UserResponse> {
    const url = `${environment.apiBaseUrl}/Admin/users`;

    return this.http.get<UserResponse>(url, { withCredentials: true }).pipe(
      tap({
        next: () => {
          const message = SUCCESS_MESSAGES_MAP.get(
            'Users Retrieved Successfully'
          );
          this.notificationService.showSuccess(
            message?.message ?? 'Users Retrieved Successfully',
            message?.label ?? 'Success'
          );
        },
      })
    );
  }
}
