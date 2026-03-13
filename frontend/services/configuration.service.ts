import request from "./api";

export interface ConfigurationResponse {
  locale: string;
  name: string | null;
}

const configurationService = {
  getConfiguration: async (): Promise<ConfigurationResponse> => {
    return request.get<ConfigurationResponse>("/api/configuration");
  },
};

export default configurationService;
