import { ReactNode } from "react";

export interface ConfigurationProviderProps {
  children: ReactNode;
}

export type ConfigurationContextType = {
  locale: string | null;
  name: string | null;
};
