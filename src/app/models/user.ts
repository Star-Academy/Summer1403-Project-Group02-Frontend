import { Role } from './role';

export interface User {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: Role[];
}
