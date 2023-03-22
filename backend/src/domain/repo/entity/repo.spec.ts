import Contributor from '../value-object/contributor';
import Owner from '../value-object/owner';
import Repo from './repo';

describe('Unit: Repo entity', () => {
  let owner: Owner;
  let contributor: Contributor;
  let repoProps;

  beforeEach(() => {
    owner = new Owner(
      'golang',
      'https://avatars.githubusercontent.com/u/4314092?v=4',
      'https://github.com/golang'
    );
    contributor = new Contributor(
      'rsc',
      'https://avatars.githubusercontent.com/u/104030?v=4',
      'https://github.com/rsc'
    );
    repoProps = {
      githubId: 23096959,
      name: 'go',
      description: 'The Go programming language',
      fullName: 'golang/go',
      private: false,
      owner,
      url: 'https://github.com/golang/go',
      contributors: [contributor],
      homePage: 'https://go.dev',
      stargazers: 109460,
      visibility: 'public',
    };
  });

  it('should create a Repo', () => {
    const repo = new Repo(
      repoProps.githubId,
      repoProps.name,
      repoProps.description,
      repoProps.fullName,
      repoProps.private,
      repoProps.owner,
      repoProps.url,
      repoProps.contributors,
      repoProps.homePage,
      repoProps.stargazers,
      repoProps.visibility
    );
    expect(repo.githubId).toStrictEqual(repoProps.githubId);
    expect(repo.name).toStrictEqual(repoProps.name);
    expect(repo.description).toStrictEqual(repoProps.description);
    expect(repo.fullName).toStrictEqual(repoProps.fullName);
    expect(repo.private).toStrictEqual(repoProps.private);
    expect(repo.owner).toStrictEqual({
      name: repoProps.owner.name,
      avatarUrl: repoProps.owner.avatarUrl,
      pageUrl: repoProps.owner.pageUrl,
    });
    expect(repo.url).toStrictEqual(repoProps.url);
    expect(repo.contributors.length).toBe(1);
    expect(repo.contributors[0].name).toStrictEqual(contributor.name);
    expect(repo.contributors[0].avatarUrl).toStrictEqual(contributor.avatarUrl);
    expect(repo.contributors[0].pageUrl).toStrictEqual(contributor.pageUrl);
    expect(repo.homePage).toStrictEqual(repoProps.homePage);
    expect(repo.stargazers).toStrictEqual(repoProps.stargazers);
    expect(repo.visibility).toStrictEqual(repoProps.visibility);
  });

  it('should restore a repo', () => {
    const repo = new Repo(
      repoProps.githubId,
      repoProps.name,
      repoProps.description,
      repoProps.fullName,
      repoProps.private,
      repoProps.owner,
      repoProps.url,
      repoProps.contributors,
      repoProps.homePage,
      repoProps.stargazers,
      repoProps.visibility
    );
    expect(repo.githubId).toStrictEqual(repoProps.githubId);
    expect(repo.name).toStrictEqual(repoProps.name);
    expect(repo.description).toStrictEqual(repoProps.description);
    expect(repo.fullName).toStrictEqual(repoProps.fullName);
    expect(repo.private).toStrictEqual(repoProps.private);
    expect(repo.owner).toStrictEqual({
      name: repoProps.owner.name,
      avatarUrl: repoProps.owner.avatarUrl,
      pageUrl: repoProps.owner.pageUrl,
    });
    expect(repo.url).toStrictEqual(repoProps.url);
    expect(repo.contributors.length).toBe(1);
    expect(repo.contributors[0].name).toStrictEqual(contributor.name);
    expect(repo.contributors[0].avatarUrl).toStrictEqual(contributor.avatarUrl);
    expect(repo.contributors[0].pageUrl).toStrictEqual(contributor.pageUrl);
    expect(repo.homePage).toStrictEqual(repoProps.homePage);
    expect(repo.stargazers).toStrictEqual(repoProps.stargazers);
    expect(repo.visibility).toStrictEqual(repoProps.visibility);
  });

  it('should validate a repo', () => {
    expect(
      () =>
        new Repo(
          123,
          '',
          '',
          '',
          repoProps.private,
          repoProps.owner,
          '',
          repoProps.contributors,
          '',
          repoProps.stargazers,
          ''
        )
    ).toThrowError();
  });
});
