import UniqueIdentifier from '../../@shared/value-objects/unique-identifier';
import RepoFactory from '../../repo/factories/repo.factory';
import Language from '../entity/language';
import LanguageFactory from './language.factory';

describe('Unit: Language factory', () => {
  it('should build a language entity without repo', () => {
    const props = {
      name: 'Go',
    };
    const language = LanguageFactory.create(props);
    expect(language).toBeInstanceOf(Language);
    expect(language.id).toBeDefined();
    expect(language.name).toStrictEqual(props.name);
  });

  it('should build a language entity all props', () => {
    const props = {
      name: 'Go',
      id: new UniqueIdentifier().value,
    };
    const language = LanguageFactory.create(props);
    expect(language).toBeInstanceOf(Language);
    expect(language.id).toStrictEqual(props.id);
    expect(language.name).toStrictEqual(props.name);
  });

  it('should build a language entity with repo', () => {
    const props = {
      name: 'Go',
      id: new UniqueIdentifier().value,
    };
    const repo = RepoFactory.create({
      githubId: 23096959,
      name: 'go',
      description: 'The Go programming language',
      fullName: 'golang/go',
      private: false,
      owner: {
        name: 'golang',
        avatarUrl: 'https://avatars.githubusercontent.com/u/4314092?v=4',
        pageUrl: 'asd',
      },
      url: 'asd',
      contributors: [
        {
          name: 'rsc',
          avatarUrl: 'https://avatars.githubusercontent.com/u/104030?v=4',
          pageUrl: 'asd',
        },
      ],
      homePage: 'https://go.dev',
      stargazers: 109460,
      languageId: props.id,
      visibility: 'public',
    });
    const language = LanguageFactory.createWithoutRepo(props, [repo]);
    expect(language).toBeInstanceOf(Language);
    expect(language.id).toStrictEqual(props.id);
    expect(language.name).toStrictEqual(props.name);
    expect(language.repos.length).toBe(1);
    expect(language.repos[0].languageId).toStrictEqual(repo.languageId);
  });
});
