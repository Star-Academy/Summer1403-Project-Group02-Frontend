import { User } from '../user';

export interface LoginResponse {
  data: User;
  type: number;
  message: string;
}
