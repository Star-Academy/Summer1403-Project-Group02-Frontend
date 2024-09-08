import { Injectable } from '@angular/core';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminEditUserService {

  private cur_user!: User;

  constructor() {
  }

  setUser(user: User) {
    this.cur_user = user;
  }

  getUser() {
    return this.cur_user;
  }
}
