import { CurrentUser } from '../current-user';

export interface LoginResponse {
  data: CurrentUser;
  type: number;
  message: string;
}
