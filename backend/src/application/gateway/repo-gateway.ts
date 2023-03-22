import Language from '../../domain/language/entity/language';
import Repo from '../../domain/repo/entity/repo';

export default interface IRepoGateway {
  getByLanguage(language: Language): Promise<Repo[]>;
}
