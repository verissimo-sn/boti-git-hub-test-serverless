/* eslint-disable @typescript-eslint/naming-convention */
export interface GetReposByLanguageResponse {
  message: 'Success';
  data: Language[];
}

export interface GetReposByLanguageResponse405 {
  message: 'Method not allowed';
  data: null;
}

export interface GetReposByLanguageResponseError {
  message: 'message-error';
  data: null;
}

export interface Language {
  id: string;
  name: string;
  repos: Repo[];
}

export interface Repo {
  githubId: number;
  name: string;
  description: string;
  fullName: string;
  private: boolean;
  owner: Owner;
  url: string;
  contributors: Contributor[];
  homePage: string;
  stargazers: number;
  visibility: string;
}

export interface Owner {
  name: string;
  avatarUrl: string;
  pageUrl: string;
}

export interface Contributor {
  name: string;
  avatarUrl: string;
  pageUrl: string;
}
