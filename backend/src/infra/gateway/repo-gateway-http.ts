import IRepoGateway from '../../application/gateway/repo-gateway';
import Repo from '../../domain/repo/entity/repo';
import IHttpClient from '../http/http-client';

export default class RepoGatewayHttp implements IRepoGateway {
  constructor(private readonly httpClient: IHttpClient) { }

  async getByLanguage(language: string): Promise<Repo[]> {
    return this.httpClient.get(
      `/search/repositories`,
      `language:${language}&sort=stars&order=desc&per_page=5`
    );
  }
}
