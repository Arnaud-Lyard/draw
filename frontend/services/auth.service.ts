import { LoginResponse, RegisterResponse } from "@/types/auth";
import request from "./api";

const authService = {
  login: async (username: string, password: string): Promise<LoginResponse> => {
    const response = await request.post<LoginResponse>("/api/login_check", {
      username,
      password,
    });
    return response;
  },

  register: async ({
    username,
    email,
    password,
    confirmPassword,
  }: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }): Promise<RegisterResponse> => {
    return request.post<RegisterResponse>("/api/register", {
      username,
      email,
      password,
      confirmPassword,
    });
  },

  logout: async () => {
    return request.post("/api/logout", {});
  },
};

export default authService;
