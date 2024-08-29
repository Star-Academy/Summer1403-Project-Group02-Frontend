import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { NotificationService } from '../notif/notification.service';
import { SUCCESS_MESSAGES_MAP } from '../../constants/success-messages';
import { UserResponse } from '../../models/api/userResponse';
import { User } from '../../models/user';
import { RoleResponse } from '../../models/api/roleResponse';

@Injectable({
  providedIn: 'root',
})
export class AdminUserService {
  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) {}

  // Fetch all users
  fetchUsers(pageNumber: 1): Observable<UserResponse> {
    const url = `${environment.apiBaseUrl}/Admin/users`;
    return this.http
      .get<UserResponse>(url, {
        withCredentials: true,
        params: { pageNumber: pageNumber },
      })
      .pipe(
        tap((response) => {
          this.usersSubject.next(response.data);
        })
      );
  }

  // Get a user by username
  getUser(username: string): Observable<User> {
    const url = `${environment.apiBaseUrl}/Admin/users/${username}`;
    return this.http
      .get<User>(url, { withCredentials: true })
      .pipe(
        tap(() => this.showSuccessNotification('User Retrieved Successfully'))
      );
  }

  // Create a new user
  createUser(user: Partial<User>): Observable<User> {
    const url = `${environment.apiBaseUrl}/Admin/users`;
    return this.http.post<User>(url, user, { withCredentials: true }).pipe(
      tap((newUser) => {
        this.usersSubject.next([...this.usersSubject.getValue(), newUser]);
        this.showSuccessNotification('User Created Successfully');
      })
    );
  }

  // Delete a user by username
  deleteUser(username: string): Observable<void> {
    const url = `${environment.apiBaseUrl}/Admin/users/${username}`;
    const body = { username };

    return this.http
      .request<void>('delete', url, {
        body,
        withCredentials: true,
      })
      .pipe(
        tap(() => {
          // Update the users list after successful deletion
          this.usersSubject.next(
            this.usersSubject
              .getValue()
              .filter((user) => user.username !== username)
          );
          this.showSuccessNotification('User Deleted Successfully');
        })
      );
  }

  // Get all roles
  fetchRoles(): Observable<RoleResponse> {
    const url = `${environment.apiBaseUrl}/Admin/roles`;
    return this.http
      .get<RoleResponse>(url, { withCredentials: true })
      .pipe(
        tap(() => this.showSuccessNotification('Roles Retrieved Successfully'))
      );
  }

  // Add a role to a user
  addRoleToUser(username: string, roleType: string): Observable<void> {
    const url = `${environment.apiBaseUrl}/Admin/users/${username}/roles`;
    const body = { roleType, username };
    return this.http
      .put<void>(url, body, { withCredentials: true })
      .pipe(tap(() => this.showSuccessNotification('Role Added Successfully')));
  }

  // Remove a role from a user
  removeRoleFromUser(username: string, roleType: string): Observable<void> {
    const url = `${environment.apiBaseUrl}/Admin/users/${username}/roles/${roleType}`;
    return this.http
      .delete<void>(url, { withCredentials: true })
      .pipe(
        tap(() => this.showSuccessNotification('Role Removed Successfully'))
      );
  }

  // Helper method to show success notifications
  private showSuccessNotification(messageKey: string) {
    const message = SUCCESS_MESSAGES_MAP.get(messageKey);
    this.notificationService.showSuccess(
      message?.message ?? messageKey,
      message?.label ?? 'Success'
    );
  }
}
