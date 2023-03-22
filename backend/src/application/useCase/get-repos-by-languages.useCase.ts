import Language from '../../domain/language/entity/language';
import IService from '../services/services.interface';

export default class GetReposByLanguagesUseCase {
  private readonly defaultLanguages: string[] = [
    'Go',
    'JavaScript',
    'Dart',
    'Java',
    'TypeScript',
  ];

  constructor(
    private readonly getRegisteredLanguagesService: IService<
      string[],
      Language[]
    >,
    private readonly getLanguageFromGithubService: IService<
      string[],
      Language[]
    >,
    private readonly saveUnregisteredLanguagesService: IService<
      Language[],
      void
    >
  ) { }

  async execute(): Promise<Language[]> {
    const normalizedNames = this.defaultLanguages.map((name) =>
      name.toLowerCase()
    );
    const foundLanguages = await this.getRegisteredLanguagesService.execute(
      normalizedNames
    );
    if (foundLanguages.length === normalizedNames.length) {
      return foundLanguages;
    }
    const foundLanguageNames = foundLanguages.map((language) => language.name);
    const unregisteredLanguages = normalizedNames.filter(
      (name) => !foundLanguageNames.includes(name)
    );
    const githubLanguagesResult =
      await this.getLanguageFromGithubService.execute(unregisteredLanguages);
    await this.saveUnregisteredLanguagesService.execute(githubLanguagesResult);
    return [...foundLanguages, ...githubLanguagesResult];
  }
}
