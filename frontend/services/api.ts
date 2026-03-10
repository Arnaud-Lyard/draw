import { ERROR_MESSAGES } from "../constants/CustomError";
import { getErrorMessage } from "../utils/getErrorMessage";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

axios.defaults.baseURL = process.env.EXPO_PUBLIC_SERVER_URL;
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error: AxiosError) {
    if (!error.response) {
      console.log({ type: "error", text1: ERROR_MESSAGES.NETWORK_ERROR });
      return Promise.reject(new Error(ERROR_MESSAGES.NETWORK_ERROR));
    }
    const { status } = error.response;

    const message = getErrorMessage(status);
    console.log({ type: "error", text1: message });
    if (status === 403 || 401) {
      // redirect to login
    }
    return Promise.reject(error);
  },
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: object, config?: AxiosRequestConfig) =>
    axios.post<T>(url, body, config).then(responseBody),
};

export default request;
