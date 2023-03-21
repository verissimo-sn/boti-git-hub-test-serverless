import Language from '../../domain/language/entity/language';
import IRepoGateway from '../gateway/repo-gateway';
import ILanguageRepository from '../repository/language.repository';

export default class GetBestLanguagesUseCase {
  private readonly defaultLanguages: string[] = [
    'Go',
    'JavaScript',
    'Dart',
    'Java',
    'TypeScript',
  ];

  constructor(
    private readonly repoGateway: IRepoGateway,
    private readonly languageRepository: ILanguageRepository
  ) { }

  async execute(): Promise<Language[]> {
    const normalizedNames = this.defaultLanguages.map((name) =>
      name.toLowerCase()
    );
    const foundLanguages = await this.getRegisteredLanguages(normalizedNames);
    if (foundLanguages.length === normalizedNames.length) {
      return foundLanguages;
    }
    const foundLanguageNames = foundLanguages.map((language) => language.name);
    const unregisteredLanguages = normalizedNames.filter(
      (name) => !foundLanguageNames.includes(name)
    );
    const githubLanguagesResult = await this.getLanguagesFromGithub(
      unregisteredLanguages
    );
    await this.saveUnregisteredLanguages(githubLanguagesResult);
    return [...foundLanguages, ...githubLanguagesResult];
  }

  private async getLanguagesFromGithub(
    languagesName: string[]
  ): Promise<Language[]> {
    return Promise.all(
      languagesName.map(async (languageName) => {
        const language = new Language(languageName);
        const repos = await this.repoGateway.getByLanguage(language);
        repos.forEach((repo) => language.addRepo(repo));
        return language;
      })
    );
  }

  private async getRegisteredLanguages(
    languagesName: string[]
  ): Promise<Language[]> {
    return this.languageRepository.getManyByName(languagesName);
  }

  private async saveUnregisteredLanguages(
    languages: Language[]
  ): Promise<void> {
    await this.languageRepository.createMany(languages);
  }
}
