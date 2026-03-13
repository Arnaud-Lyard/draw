import { LoginResponse, RegisterResponse } from "@/types/auth";
import request from "./api";

const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await request.post<LoginResponse>("/api/login_check", {
      username: email,
      password,
    });
    console.log(response);
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

  logout: () => {},

  me: async (): Promise<MeResponse> => {
    return request.get<MeResponse>("/api/me");
  },
};

export default authService;
