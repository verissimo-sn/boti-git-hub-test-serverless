import Language from '../../domain/language/entity/language';
import IRepoGateway from '../gateway/repo-gateway';

export default class GetBestLanguagesUseCase {
  private readonly bestLanguages: string[] = [
    'Go',
    'JavaScript',
    'Dart',
    'Java',
    'TypeScript',
  ];

  constructor(private readonly repoGateway: IRepoGateway) { }

  async execute(): Promise<Language[]> {
    return this.buildLanguage(this.bestLanguages);
  }

  private async buildLanguage(languagesName: string[]): Promise<Language[]> {
    return Promise.all(
      languagesName.map(async (languageName) => {
        const language = new Language(languageName);
        const repos = await this.repoGateway.getByLanguage(language);
        repos.forEach((repo) => language.addRepo(repo));
        return language;
      })
    );
  }
}
