import axios from 'axios';
import { BackendHttpClient } from "./backend";

describe('Backend client http', () => {
  let httpInstance: any;
  let clientInstance: any;

  beforeEach(() => {
    httpInstance = axios.create({
      baseURL: 'http://localhost:3000'
    });
    clientInstance = new BackendHttpClient(httpInstance);
  });

  it('should be call client instance', async () => {
    const httpMock = jest.spyOn(httpInstance, 'get').mockResolvedValue({ data: { data: [] } });
    await clientInstance.getRepositoriesByLanguage();
    expect(httpMock).toHaveBeenCalled();
  });

  it('should be data prop of response', async () => {
    jest.spyOn(httpInstance, 'get').mockResolvedValue({ data: { data: [] } });
    const response = await clientInstance.getRepositoriesByLanguage();
    expect(response).toStrictEqual([]);
  });
});