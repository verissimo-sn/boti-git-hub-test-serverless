import Language from '../entity/language';

export default class LanguageFactory {
  static create(languageProps: LanguageProps): Language {
    return new Language(
      languageProps.name,
      languageProps.id,
      languageProps.lastUpdate
    );
  }
}

type LanguageProps = {
  id?: string;
  name: string;
  lastUpdate?: Date;
};
