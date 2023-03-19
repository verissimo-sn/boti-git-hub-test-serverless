import UniqueIdentifier from '../../@shared/value-objects/unique-identifier';
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
      contribuitors: [contributor],
      homePage: 'https://go.dev',
      stargazers: 109460,
      languageId: new UniqueIdentifier().value,
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
      repoProps.contribuitors,
      repoProps.homePage,
      repoProps.stargazers,
      repoProps.languageId,
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
    expect(repo.contribuitors.length).toBe(1);
    expect(repo.contribuitors[0].name).toStrictEqual(contributor.name);
    expect(repo.contribuitors[0].avatarUrl).toStrictEqual(
      contributor.avatarUrl
    );
    expect(repo.contribuitors[0].pageUrl).toStrictEqual(contributor.pageUrl);
    expect(repo.homePage).toStrictEqual(repoProps.homePage);
    expect(repo.stargazers).toStrictEqual(repoProps.stargazers);
    expect(repo.languageId).toStrictEqual(repoProps.languageId);
    expect(repo.visibility).toStrictEqual(repoProps.visibility);
  });

  it('should restore a repo', () => {
    const id = new UniqueIdentifier().value;
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
      repoProps.languageId,
      repoProps.visibility,
      id
    );
    expect(repo.id).toStrictEqual(id);
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
    expect(repo.contribuitors.length).toBe(1);
    expect(repo.contribuitors[0].name).toStrictEqual(contributor.name);
    expect(repo.contribuitors[0].avatarUrl).toStrictEqual(
      contributor.avatarUrl
    );
    expect(repo.contribuitors[0].pageUrl).toStrictEqual(contributor.pageUrl);
    expect(repo.homePage).toStrictEqual(repoProps.homePage);
    expect(repo.stargazers).toStrictEqual(repoProps.stargazers);
    expect(repo.languageId).toStrictEqual(repoProps.languageId);
    expect(repo.visibility).toStrictEqual(repoProps.visibility);
  });
});
