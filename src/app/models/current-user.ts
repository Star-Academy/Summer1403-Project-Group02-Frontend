import { Role } from './role';

export interface CurrentUser {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: Role[];
}
