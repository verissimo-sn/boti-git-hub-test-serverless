import IRepoGateway from '../../application/gateway/repo-gateway';
import Language from '../../domain/language/entity/language';
import Repo from '../../domain/repo/entity/repo';
import IHttpClient from '../http/http-client';
import AxiosGithubRepoDataMapper, {
  GithubContributorsType
} from './mappers/axios-repo-data-mapper';

export default class RepoGatewayHttp implements IRepoGateway {
  private readonly baseUrl = 'https://api.github.com';

  constructor(private readonly httpClient: IHttpClient) { }

  async getByLanguage(language: Language): Promise<Repo[]> {
    const query = {
      q: `language:${language.name}`,
      sort: 'stars',
      order: 'desc',
      per_page: '5',
    };
    const response = await this.httpClient.get(
      `${this.baseUrl}/search/repositories`,
      query
    );
    const repoWithContributors = await Promise.all(
      response.items.map(async (repo) => {
        return {
          ...repo,
          contributors: await this.getContributors(repo.contributors_url),
        };
      })
    );
    return AxiosGithubRepoDataMapper.toRepoPropList(
      repoWithContributors,
      language.id
    );
  }

  private async getContributors(
    url: string
  ): Promise<GithubContributorsType[]> {
    const response = await this.httpClient.get(url);
    return response.map((contributor: GithubContributorsType) => ({
      login: contributor.login,
      avatar_url: contributor.avatar_url,
      html_url: contributor.html_url,
    }));
  }
}
