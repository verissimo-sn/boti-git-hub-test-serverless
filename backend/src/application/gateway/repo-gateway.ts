import Repo from '../../domain/repo/entity/repo';

export default interface IRepoGateway {
  getByLanguage(language: string): Promise<Repo[]>;
}
