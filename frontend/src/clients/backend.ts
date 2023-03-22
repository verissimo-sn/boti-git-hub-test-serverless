import { AxiosInstance } from 'axios';

export class BackendHttpClient {
  constructor(private readonly httpInstance: AxiosInstance) { }

  async getRepositoriesByLanguage(): Promise<Language[]> {
    const { data } = await this.httpInstance.get<GetRepositoryResponse>('dev/repo-by-languages');
    return data.data;
  }
}

interface GetRepositoryResponse {
  message: string,
  data: Language[]
}

export interface Language {
  id: string
  name: string
  repos: Repo[]
}

export interface Repo {
  githubId: number
  name: string
  description: string
  fullName: string
  private: boolean
  owner: Owner
  url: string
  contributors: Contributor[]
  homePage: string
  stargazers: number
  visibility: string
}

export interface Owner {
  name: string
  avatarUrl: string
  pageUrl: string
}

export interface Contributor {
  name: string
  avatarUrl: string
  pageUrl: string
}
