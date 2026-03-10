import {
  ConfigurationContextType,
  ConfigurationProviderProps,
} from "@/types/context";
import { createContext } from "react";

export const ConfigurationContext =
  createContext<ConfigurationContextType | null>(null);

export function ConfigurationProvider({
  children,
}: ConfigurationProviderProps) {
  return (
    <ConfigurationContext.Provider value={{}}>
      {children}
    </ConfigurationContext.Provider>
  );
}
