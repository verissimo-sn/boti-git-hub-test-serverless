import Language from '../../domain/language/entity/language';
import IRepoGateway from '../gateway/repo-gateway';
import IService from './services.interface';

export default class GetLanguageFromGithubService
  implements IService<string[], Language[]>
{
  constructor(private readonly repoGateway: IRepoGateway) { }

  async execute(languagesName: string[]): Promise<Language[]> {
    try {
      return Promise.all(
        languagesName.map(async (languageName) => {
          const language = new Language(languageName);
          const repos = await this.repoGateway.getByLanguage(language);
          repos.forEach((repo) => language.addRepo(repo));
          return language;
        })
      );
    } catch (error) {
      console.log('Error getting languages from Github', error.message);
      throw new Error('Error getting languages from Github');
    }
  }
}
