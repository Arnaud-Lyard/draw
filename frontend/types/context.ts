import { ReactNode } from "react";
import { IUser } from "./user";

export interface ConfigurationProviderProps {
  children: ReactNode;
}

export type ConfigurationContextType = {
  locale: string | null;
  name: string | null;
};

export type UserContextType = {
  user: IUser | null;
  loading: boolean;
};
