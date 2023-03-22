import Repo from '../../repo/entity/repo';
import Language from '../entity/language';

export default class LanguageFactory {
  static createWithoutRepo(
    languageProps: LanguageProps,
    repos: Repo[]
  ): Language {
    const newLanguage = new Language(languageProps.name, languageProps?.id);
    repos.forEach((repo) => newLanguage.addRepo(repo));
    return newLanguage;
  }

  static create(languageProps: LanguageProps): Language {
    return new Language(languageProps.name, languageProps?.id);
  }
}

type LanguageProps = Pick<
  Language,
  keyof Omit<Language, 'id' | 'addRepo' | 'repos'>
> & {
  id?: string;
};
