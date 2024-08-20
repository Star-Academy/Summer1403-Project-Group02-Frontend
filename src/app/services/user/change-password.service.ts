import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

    return this.http.patch<ChangepassResponse>(url, body, {
      withCredentials: true,
    });
  }
}
