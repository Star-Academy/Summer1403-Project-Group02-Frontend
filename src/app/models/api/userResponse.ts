import { User } from '../user';

export interface AllUserResponse {
  data: User[];
  type: number;
  message: string;
}

export interface UserResponse {
  data: User;
  type: number;
  message: string;
}
