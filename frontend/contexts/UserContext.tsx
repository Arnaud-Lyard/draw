"use client";

import userService from "@/services/user.service";
import {
  ConfigurationProviderProps,
  UserContextType
} from "@/types/context";
import { IUser } from "@/types/user";
import { createContext, useEffect, useState } from "react";

export const UserContext =
  createContext<UserContextType | null>(null);

export function UserProvider({
  children,
}: ConfigurationProviderProps) {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const response = await userService.me();
      setUser(response.user);
      setLoading(false);
    };
    fetchUser();
  }, []);
  return (
    <UserContext.Provider value={{user, loading}}>
      {children}
    </UserContext.Provider>
  );
}
