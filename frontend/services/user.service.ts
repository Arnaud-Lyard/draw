import request from "./api";
import { IUser } from "@/types/user";

const userService = {
  me: async (): Promise<IUser> => {
    const response = request.get<IUser>("/api/me");
    return response;
  },

  logout: () => {},
};

export default userService;
