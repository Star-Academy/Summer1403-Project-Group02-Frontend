import { CurrentUser } from '../current-user';

export interface LoginAPIResponse {
  data: CurrentUser;
  type: number;
  message: string;
}
