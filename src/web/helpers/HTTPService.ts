import axios, { AxiosRequestConfig } from 'axios';
import { API_PATH } from 'web/constant';

export class HTTPService {
  private instance = axios.create({ baseURL: API_PATH });

  constructor() {
    this.instance.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        return Promise.reject(error);
      },
    );
  }

  updateToken(token: string) {
    this.instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  get<O>(path: string) {
    return this.instance.get(path) as Promise<O>;
  }

  post<I, O>(path: string, data: I, options?: AxiosRequestConfig) {
    return this.instance.post(path, data, options) as Promise<O>;
  }

  put<I, O>(path: string, data: I) {
    return this.instance.put(path, data) as Promise<O>;
  }

  delete(path: string) {
    return this.instance.delete(path) as Promise<void>;
  }
}
