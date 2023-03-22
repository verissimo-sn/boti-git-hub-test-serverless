import { AxiosInstance } from 'axios';

import IHttpClient from './http-client';

export default class AxiosAdapter implements IHttpClient {
  constructor(private readonly axiosInstance: AxiosInstance) { }

  async get(url: string, query?: { [key: string]: string }): Promise<any> {
    const response = await this.axiosInstance.get(url, {
      params: {
        ...query,
      },
    });
    return response.data;
  }
}
