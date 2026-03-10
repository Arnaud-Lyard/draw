import { IResponse } from "@/types/api";
import request from "./api";
const userService = {
  register: ({
    username,
    email,
    password,
    confirm,
  }: {
    username: string;
    email: string;
    password: string;
    confirm: string;
  }) => {
    const response = request.post<IResponse>(`/signup`, {
      username,
      email,
      password,
      confirm,
    });
    return response;
  },
};
export default userService;
