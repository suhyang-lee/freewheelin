import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

class AxiosClient {
  private axiosInstance: AxiosInstance;

  constructor(baseURL?: string) {
    this.axiosInstance = axios.create({
      baseURL: baseURL || process.env.REACT_APP_API_URL || "https://assignment.mathflat.com",
      timeout: 10000,
    });
  }

  get instance() {
    return this.axiosInstance;
  }

  get = <T = unknown,>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    this.axiosInstance.get(url, config);
}

const ApiClient = new AxiosClient();

export default ApiClient;
