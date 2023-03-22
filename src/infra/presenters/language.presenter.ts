import Language from '../../domain/language/entity/language';

export default class LanguagePresenter {
  static languageToJSon(language: Language): object {
    return {
      id: language.id,
      name: language.name,
      repos: language.repos.map((repo) => ({
        id: repo.id,
        githubId: repo.githubId,
        name: repo.name,
        description: repo.description,
        fullName: repo.fullName,
        private: repo.private,
        owner: repo.owner,
        url: repo.url,
        contributors: repo.contributors,
        homePage: repo.homePage,
        stargazers: repo.stargazers,
        languageId: repo.languageId,
        visibility: repo.visibility,
      })),
    };
  }
}
