import { ERROR_MESSAGES } from "../constants/CustomError";

export const getErrorMessage = (
  status: number | undefined,
  lang: string = "en",
) => {
  const dictionary =
    ERROR_MESSAGES[lang as keyof typeof ERROR_MESSAGES] || ERROR_MESSAGES.en;

  if (!status) return dictionary.NETWORK_ERROR;

  return (
    dictionary[status as keyof typeof dictionary] || dictionary.GENERIC_ERROR
  );
};
