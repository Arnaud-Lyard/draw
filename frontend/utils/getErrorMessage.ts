import { ERROR_MESSAGES } from "../constants/CustomError";
import { ErrorHttpCode } from "../types/error";

function isErrorMessageKey(key: number | string): key is ErrorHttpCode {
  return key in ERROR_MESSAGES;
}

export function getErrorMessage(status: number) {
  if (isErrorMessageKey(status)) {
    return ERROR_MESSAGES[status];
  }
  return ERROR_MESSAGES.GENERIC_ERROR;
}
