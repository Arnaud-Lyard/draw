import { IUser } from "./user";

export interface IResponse {
  message: string;
}

export interface IMeResponse {
  user: IUser | null;
}
