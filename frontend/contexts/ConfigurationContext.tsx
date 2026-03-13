"use client";

import configurationService from "@/services/configuration.service";
import {
  ConfigurationContextType,
  ConfigurationProviderProps,
} from "@/types/context";
import { setCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

export const ConfigurationContext =
  createContext<ConfigurationContextType | null>(null);

export function ConfigurationProvider({
  children,
}: ConfigurationProviderProps) {
  const [locale, setLocale] = useState<string | null>("en");
  const [name, setName] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchConfiguration = async () => {
      const configuration = await configurationService.getConfiguration();
      setLocale(configuration.locale);
      setName(configuration.name);
    };
    fetchConfiguration();
  }, [pathname, router]);
  return (
    <ConfigurationContext.Provider value={{ locale, name }}>
      {children}
    </ConfigurationContext.Provider>
  );
}
