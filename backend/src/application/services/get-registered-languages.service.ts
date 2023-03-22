import Language from '../../domain/language/entity/language';
import ILanguageRepository from '../repository/language.repository';
import IService from './services.interface';

export default class GetRegisteredLanguagesService
  implements IService<string[], Language[]>
{
  constructor(private readonly languageRepository: ILanguageRepository) { }

  async execute(languagesName: string[]): Promise<Language[]> {
    try {
      return this.languageRepository.getManyByName(languagesName);
    } catch (error) {
      console.log('Error getting registered languages', error.message);
      throw new Error('Error getting registered languages');
    }
  }
}
