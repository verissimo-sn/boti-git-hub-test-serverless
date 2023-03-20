export default interface IHttpClient {
  get(url: string, query?: string): Promise<any>;
}
