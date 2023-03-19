import UniqueIdentifier from '../../@shared/value-objects/unique-identifier';
import Repo from '../entity/repo';
import RepoFactory from './repo.factory';

describe('Unit: Repo factory', () => {
  let repoProps;

  beforeEach(() => {
    repoProps = {
      githubId: 23096959,
      name: 'go',
      description: 'The Go programming language',
      fullName: 'golang/go',
      private: false,
      owner: {
        name: 'golang',
        avatarUrl: 'https://avatars.githubusercontent.com/u/4314092?v=4',
        pageUrl: 'https://github.com/golang',
      },
      url: 'https://github.com/golang/go',
      contribuitors: [
        {
          name: 'rsc',
          avatarUrl: 'https://avatars.githubusercontent.com/u/104030?v=4',
          pageUrl: 'https://github.com/rsc',
        },
      ],
      homePage: 'https://go.dev',
      stargazers: 109460,
      languageId: new UniqueIdentifier().value,
      license: 'bsd-3-clause',
      visibility: 'public',
    };
  });

  it('should build a Repo entity', () => {
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
    expect(repo.languageId).toStrictEqual(repoProps.languageId);
    expect(repo.visibility).toStrictEqual(repoProps.visibility);
  });

  it('should build a Repo entity with all props', () => {
    const id = new UniqueIdentifier().value;
    const repo = RepoFactory.create({
      ...repoProps,
      id,
    });
    expect(repo).toBeInstanceOf(Repo);
    expect(repo.id).toStrictEqual(id);
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
    expect(repo.languageId).toStrictEqual(repoProps.languageId);
    expect(repo.visibility).toStrictEqual(repoProps.visibility);
  });
});
