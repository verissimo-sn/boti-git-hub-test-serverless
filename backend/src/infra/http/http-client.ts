export default interface IHttpClient {
  get(url: string, query?: { [key: string]: string }): Promise<any>;
}
