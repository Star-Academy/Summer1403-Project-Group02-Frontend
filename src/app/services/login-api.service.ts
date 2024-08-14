import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { API_PATH_MAP } from '../app.config';
import LoginModels from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginApiService implements OnInit {

  private obs = new BehaviorSubject<any | undefined>(undefined);

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    //TODO: when app start, check if user is logged in
    this.obs.next(undefined);
  }

  subscribeUser(): Observable<any | undefined> {
    return this.obs.asObservable();
  }

  logOut(): void {
    this.obs.next(undefined);
  }

  loginUser(user: LoginModels): Promise<string> {
    return new Promise((resolve) => {
      this.http.get<any>(API_PATH_MAP.login).subscribe((res: any) => {

        //TODO: check api result
        resolve("ok");
        this.obs.next(res);
      });
    });
  }
}


