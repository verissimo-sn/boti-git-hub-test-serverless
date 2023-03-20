export default class AxiosGithubRepoDataMapper {
  static toRepoPropList(githubRepoList: GithubRepoItem[]) {
    return githubRepoList.map((gitRepo) => {
      return {
        githubId: gitRepo.id,
        name: gitRepo.name,
        description: gitRepo.description,
        fullName: gitRepo.full_name,
        private: gitRepo.private,
        owner: {
          name: gitRepo.owner.login,
          avatarUrl: gitRepo.owner.avatar_url,
          pageUrl: gitRepo.owner.html_url,
        },
        url: gitRepo.html_url,
        contributors: gitRepo.contributors.map((contributor) => ({
          name: contributor.login,
          avatarUrl: contributor.avatar_url,
          pageUrl: contributor.html_url,
        })),
        homePage: gitRepo.homepage,
        stargazers: gitRepo.stargazers_count,
        visibility: gitRepo.visibility,
      };
    });
  }
}

type GithubRepoItem = {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  owner: GithubOwner;
  html_url: string;
  description: string;
  contributors: GithubContributorsType[];
  homepage: string;
  stargazers_count: number;
  visibility: string;
};

type GithubOwner = {
  login: string;
  avatar_url: string;
  html_url: string;
};

export type GithubContributorsType = {
  login: string;
  avatar_url: string;
  html_url: string;
};
