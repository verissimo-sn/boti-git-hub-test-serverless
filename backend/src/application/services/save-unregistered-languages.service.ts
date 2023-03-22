import Language from '../../domain/language/entity/language';
import ILanguageRepository from '../repository/language.repository';
import IService from './services.interface';

export default class SaveUnregisteredLanguagesService
  implements IService<Language[], void>
{
  constructor(private readonly languageRepository: ILanguageRepository) { }

  async execute(languages: Language[]): Promise<void> {
    try {
      await this.languageRepository.createMany(languages);
    } catch (error) {
      console.log('Error saving unregistered languages', error.message);
      throw new Error('Error saving unregistered languages');
    }
  }
}
