import UniqueIdentifier from '../../@shared/value-objects/unique-identifier';
import RepoFactory from '../../repo/factories/repo.factory';
import Language from './language';

describe('Unit: Language entity', () => {
  it('should create a language', () => {
    const languageProps = {
      name: 'go',
    };
    const language = new Language(languageProps.name);
    expect(language.id).toBeDefined();
    expect(language.name).toBe(languageProps.name);
  });

  it('should restore a language', () => {
    const languageProps = {
      name: 'go',
      lastUpdate: new Date(),
      id: new UniqueIdentifier().value,
    };
    const language = new Language(languageProps.name, languageProps.id);
    expect(language.id).toStrictEqual(languageProps.id);
    expect(language.id).toStrictEqual(languageProps.id);
  });

  it('should add a repo', () => {
    const languageProps = {
      name: 'go',
      lastUpdate: new Date(),
      id: new UniqueIdentifier().value,
    };
    const language = new Language(languageProps.name, languageProps.id);
    const repoProps = {
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
      languageId: language.id,
      license: 'bsd-3-clause',
      visibility: 'public',
    };
    const repo = RepoFactory.create(repoProps);
    language.addRepo(repo);
    expect(language.id).toStrictEqual(languageProps.id);
    expect(language.id).toStrictEqual(languageProps.id);
    expect(language.repos).toHaveLength(1);
    expect(language.repos[0]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        githubId: repoProps.githubId,
        name: repoProps.name,
        description: repoProps.description,
        fullName: repoProps.fullName,
        private: repoProps.private,
        owner: {
          name: repoProps.owner.name,
          avatarUrl: repoProps.owner.avatarUrl,
          pageUrl: repoProps.owner.pageUrl,
        },
        url: repoProps.url,
        contribuitors: [
          {
            name: repoProps.contribuitors[0].name,
            avatarUrl: repoProps.contribuitors[0].avatarUrl,
            pageUrl: repoProps.contribuitors[0].pageUrl,
          },
        ],
        homePage: repoProps.homePage,
        stargazers: repoProps.stargazers,
        languageId: repoProps.languageId,
        visibility: repoProps.visibility,
      })
    );
  });
});
