import UniqueIdentifier from '../../@shared/value-objects/unique-identifier';
import Owner from '../value-object/owner';
import Repo from './repo';

describe('Unit: Repo entity', () => {
  it('should create a Repo', () => {
    const owner = new Owner(
      'golang',
      'https://avatars.githubusercontent.com/u/4314092?v=4',
      'https://github.com/golang'
    );
    const repoProps = {
      githubId: 23096959,
      name: 'go',
      description: 'The Go programming language',
      fullName: 'golang/go',
      private: false,
      owner,
      url: 'https://github.com/golang/go',
      contribuitors: 'https://api.github.com/repos/golang/go/contributors',
      homePage: 'https://go.dev',
      stargazers: 109460,
      language: 'Go',
      license: 'bsd-3-clause',
      visibility: 'public',
    };
    const repo = new Repo(
      repoProps.githubId,
      repoProps.name,
      repoProps.description,
      repoProps.fullName,
      repoProps.private,
      repoProps.owner,
      repoProps.url,
      repoProps.contribuitors,
      repoProps.homePage,
      repoProps.stargazers,
      repoProps.language,
      repoProps.license,
      repoProps.visibility
    );
    expect(repo.id).toBeDefined();
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
    expect(repo.contribuitors).toStrictEqual(repoProps.contribuitors);
    expect(repo.homePage).toStrictEqual(repoProps.homePage);
    expect(repo.stargazers).toStrictEqual(repoProps.stargazers);
    expect(repo.language).toStrictEqual(repoProps.language);
    expect(repo.license).toStrictEqual(repoProps.license);
    expect(repo.visibility).toStrictEqual(repoProps.visibility);
  });

  it('should restore a repo', () => {
    const owner = new Owner(
      'golang',
      'https://avatars.githubusercontent.com/u/4314092?v=4',
      'https://github.com/golang'
    );
    const repoProps = {
      githubId: 23096959,
      name: 'go',
      description: 'The Go programming language',
      fullName: 'golang/go',
      private: false,
      owner,
      url: 'https://github.com/golang/go',
      contribuitors: 'https://api.github.com/repos/golang/go/contributors',
      homePage: 'https://go.dev',
      stargazers: 109460,
      language: 'Go',
      license: 'bsd-3-clause',
      visibility: 'public',
      id: new UniqueIdentifier().value,
    };
    const repo = new Repo(
      repoProps.githubId,
      repoProps.name,
      repoProps.description,
      repoProps.fullName,
      repoProps.private,
      repoProps.owner,
      repoProps.url,
      repoProps.contribuitors,
      repoProps.homePage,
      repoProps.stargazers,
      repoProps.language,
      repoProps.license,
      repoProps.visibility,
      repoProps.id
    );
    expect(repo.id).toStrictEqual(repoProps.id);
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
    expect(repo.contribuitors).toStrictEqual(repoProps.contribuitors);
    expect(repo.homePage).toStrictEqual(repoProps.homePage);
    expect(repo.stargazers).toStrictEqual(repoProps.stargazers);
    expect(repo.language).toStrictEqual(repoProps.language);
    expect(repo.license).toStrictEqual(repoProps.license);
    expect(repo.visibility).toStrictEqual(repoProps.visibility);
  });
});
