import Language from '../../domain/language/entity/language';

export default interface ILanguageRepository {
  createMany(data: Language[]): Promise<void>;
  getManyByIds(data: string[]): Promise<Language[]>;
}
