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

  // 편의 메서드들
  get = <T = unknown,>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    this.axiosInstance.get(url, config);

  post = <T = unknown,>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    this.axiosInstance.post(url, data, config);

  put = <T = unknown,>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    this.axiosInstance.put(url, data, config);

  patch = <T = unknown,>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    this.axiosInstance.patch(url, data, config);

  delete = <T = unknown,>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    this.axiosInstance.delete(url, config);
}

const ApiClient = new AxiosClient();

export default ApiClient;
