import { ERROR_MESSAGES } from "@/constants/CustomError";

export type ErrorHttpCode = Extract<keyof typeof ERROR_MESSAGES, number>;
