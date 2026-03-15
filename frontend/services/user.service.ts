import { IMeResponse } from "@/types/api";
import request from "./api";
import { IUser } from "@/types/user";

const userService = {
  me: async (): Promise<IMeResponse> => {
    const response = request.get<IMeResponse>("/api/me");
    return response;
  },

  logout: () => {},
};

export default userService;
