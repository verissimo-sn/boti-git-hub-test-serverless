import axios, { AxiosInstance } from 'axios';

import IHttpClient from './http-client';
import AxiosGithubRepoDataMapper, {
  GithubContributorsType
} from './mappers/axios-repo-data-mapper';

export default class GithubAxiosAdapter implements IHttpClient {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'https://api.github.com',
      headers: {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });
  }

  async get(url: string, query?: string): Promise<unknown> {
    const response = await this.axiosInstance.get(
      `${url}${query ? `?q=${query}` : ''}}`
    );
    const repoWithContributors = response.data.items.map(async (repo) => {
      const contributors = await this.getContributors(repo.contributors_url);
      return {
        ...repo,
        contributors,
      };
    });
    return AxiosGithubRepoDataMapper.toRepoPropList(repoWithContributors);
  }

  private async getContributors(
    url: string
  ): Promise<GithubContributorsType[]> {
    const response = await this.axiosInstance.get(url);
    return response.data.map((contributor: GithubContributorsType) => ({
      login: contributor.login,
      avatarUrl: contributor.avatar_url,
      pageUrl: contributor.html_url,
    }));
  }
}
