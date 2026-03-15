import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { getErrorMessage } from "../utils/getErrorMessage";
import { getLocale } from "@/utils/getLocale";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
axios.defaults.withCredentials = true;

axios.interceptors.request.use((config) => {
  const locale = getLocale();
  config.headers["Accept-Language"] = locale;

  return config;
});

axios.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const locale = getLocale();
    const status = error.response?.status;
    const requestUrl = error.config?.url || "";

    const isLogout = requestUrl.includes("/api/logout");

    if (!isLogout) {
      const message = getErrorMessage(status, locale);
      toast.error(message);
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
