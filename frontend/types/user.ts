import { RoleType } from "./roles";

export interface IUser {
  email: string;
  roles: [RoleType];
}
