import Language from 'domain/language/entity/language';

import GetReposByLanguagesUseCase from './get-repos-by-languages.useCase';

describe('Unit: GetReposByLanguagesUseCase', () => {
  let getRegisteredLanguagesService;
  let getLanguageFromGithubService;
  let saveUnregisteredLanguagesService;
  let useCase: GetReposByLanguagesUseCase;

  beforeEach(() => {
    getRegisteredLanguagesService = { execute: jest.fn } as any;
    getLanguageFromGithubService = { execute: jest.fn } as any;
    saveUnregisteredLanguagesService = { execute: jest.fn } as any;
    useCase = new GetReposByLanguagesUseCase(
      getRegisteredLanguagesService,
      getLanguageFromGithubService,
      saveUnregisteredLanguagesService
    );
  });

  it('should return languages if repository found all provided languages', async () => {
    const expectedLanguages = [
      'go',
      'javascript',
      'dart',
      'java',
      'typescript',
    ];
    jest
      .spyOn(getRegisteredLanguagesService, 'execute')
      .mockImplementation((languagesName: string[]) => {
        expect(languagesName).toHaveLength(5);
        expect(languagesName).toEqual(
          expect.arrayContaining(expectedLanguages)
        );
        return expectedLanguages;
      });
    const spyGithubService = jest.spyOn(
      getLanguageFromGithubService,
      'execute'
    );
    const spyUnregisteredLanguages = jest.spyOn(
      saveUnregisteredLanguagesService,
      'execute'
    );

    const output = await useCase.execute();
    expect(output).toHaveLength(5);
    expect(output).toEqual(expect.arrayContaining(expectedLanguages));
    expect(spyGithubService).not.toHaveBeenCalled();
    expect(spyUnregisteredLanguages).not.toHaveBeenCalled();
  });

  it('should return languages that have not yet been registered', async () => {
    const languages1 = ['dart', 'java', 'typescript'];
    const languages2 = ['go', 'javascript'];
    jest
      .spyOn(getRegisteredLanguagesService, 'execute')
      .mockImplementation((names: string[]) => {
        expect(names).toHaveLength(5);
        expect(names).toEqual(
          expect.arrayContaining([...languages1, ...languages2])
        );
        return languages1.map((name) => new Language(name));
      });
    jest
      .spyOn(getLanguageFromGithubService, 'execute')
      .mockImplementation((names: string[]) => {
        expect(names).toHaveLength(2);
        expect(names).toEqual(expect.arrayContaining(languages2));
        return languages2.map((name) => new Language(name));
      });
    jest
      .spyOn(saveUnregisteredLanguagesService, 'execute')
      .mockImplementation((languages: Language[]) => {
        expect(languages).toHaveLength(2);
        expect(languages.map((language) => language.name)).toEqual(
          expect.arrayContaining(languages2)
        );
        return languages2.map((name) => new Language(name));
      });

    const output = await useCase.execute();
    expect(output).toHaveLength(5);
    expect(output.map((language) => language.name)).toEqual(
      expect.arrayContaining([...languages1, ...languages2])
    );
  });
});
