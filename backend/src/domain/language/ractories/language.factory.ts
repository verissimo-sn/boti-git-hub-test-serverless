import Language from '../entity/language';

export default class LanguageFactory {
  static create(languageProps: LanguageProps): Language {
    return new Language(
      languageProps.name,
      languageProps?.id,
      languageProps?.lastUpdate
    );
  }
}

type LanguageProps = Pick<
  Language,
  keyof Omit<Language, 'id' | 'lastUpdate'>
> & {
  id?: string;
  lastUpdate?: Date;
};
