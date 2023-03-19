import UniqueIdentifier from '../../@shared/value-objects/unique-identifier';
import Repo from '../entity/repo';
import RepoFactory from './repo.factory';

describe('Unit: Repo factory', () => {
  it('should build a Repo entity', () => {
    const repoProps = {
      githubId: 23096959,
      name: 'go',
      description: 'The Go programming language',
      fullName: 'golang/go',
      private: false,
      owner: 'golang',
      url: 'https://github.com/golang/go',
      contribuitors: 'https://api.github.com/repos/golang/go/contributors',
      homePage: 'https://go.dev',
      stargazers: 109460,
      language: 'Go',
      license: 'bsd-3-clause',
      visibility: 'public',
    };
    const repo = RepoFactory.create(repoProps);
    expect(repo.id).toBeDefined();
    expect(repo).toBeInstanceOf(Repo);
    expect(repo.githubId).toStrictEqual(repoProps.githubId);
    expect(repo.name).toStrictEqual(repoProps.name);
    expect(repo.description).toStrictEqual(repoProps.description);
    expect(repo.fullName).toStrictEqual(repoProps.fullName);
    expect(repo.private).toStrictEqual(repoProps.private);
    expect(repo.owner).toStrictEqual(repoProps.owner);
    expect(repo.url).toStrictEqual(repoProps.url);
    expect(repo.contribuitors).toStrictEqual(repoProps.contribuitors);
    expect(repo.homePage).toStrictEqual(repoProps.homePage);
    expect(repo.stargazers).toStrictEqual(repoProps.stargazers);
    expect(repo.language).toStrictEqual(repoProps.language);
    expect(repo.license).toStrictEqual(repoProps.license);
    expect(repo.visibility).toStrictEqual(repoProps.visibility);
  });

  it('should build a Repo entity with all props', () => {
    const repoProps = {
      githubId: 23096959,
      name: 'go',
      description: 'The Go programming language',
      fullName: 'golang/go',
      private: false,
      owner: 'golang',
      url: 'https://github.com/golang/go',
      contribuitors: 'https://api.github.com/repos/golang/go/contributors',
      homePage: 'https://go.dev',
      stargazers: 109460,
      language: 'Go',
      license: 'bsd-3-clause',
      visibility: 'public',
      id: new UniqueIdentifier().value,
    };
    const repo = RepoFactory.create(repoProps);
    expect(repo).toBeInstanceOf(Repo);
    expect(repo.id).toStrictEqual(repoProps.id);
    expect(repo.githubId).toStrictEqual(repoProps.githubId);
    expect(repo.name).toStrictEqual(repoProps.name);
    expect(repo.description).toStrictEqual(repoProps.description);
    expect(repo.fullName).toStrictEqual(repoProps.fullName);
    expect(repo.private).toStrictEqual(repoProps.private);
    expect(repo.owner).toStrictEqual(repoProps.owner);
    expect(repo.url).toStrictEqual(repoProps.url);
    expect(repo.contribuitors).toStrictEqual(repoProps.contribuitors);
    expect(repo.homePage).toStrictEqual(repoProps.homePage);
    expect(repo.stargazers).toStrictEqual(repoProps.stargazers);
    expect(repo.language).toStrictEqual(repoProps.language);
    expect(repo.license).toStrictEqual(repoProps.license);
    expect(repo.visibility).toStrictEqual(repoProps.visibility);
  });
});
