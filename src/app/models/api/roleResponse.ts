import { Role } from '../role';

export interface RoleResponse {
  data: Role[];
  type: number;
  message: string;
}
