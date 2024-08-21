import { User } from '../user';

export interface UserResponse {
  data: User[];
  type: number;
  message: string;
}
