import axios, { AxiosInstance } from "axios";

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
  get = (url: string, config?: any) => this.axiosInstance.get(url, config);
  post = (url: string, data?: any, config?: any) => this.axiosInstance.post(url, data, config);
  put = (url: string, data?: any, config?: any) => this.axiosInstance.put(url, data, config);
  patch = (url: string, data?: any, config?: any) => this.axiosInstance.patch(url, data, config);
  delete = (url: string, config?: any) => this.axiosInstance.delete(url, config);
}

const ApiClient = new AxiosClient();

export default ApiClient;
