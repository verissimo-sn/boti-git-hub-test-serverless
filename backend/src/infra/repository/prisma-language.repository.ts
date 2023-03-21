import { PrismaClient } from '@prisma/client';

import ILanguageRepository from '../../application/repository/language.repository';
import Language from '../../domain/language/entity/language';
import LanguageFactory from '../../domain/language/factories/language.factory';
import RepoFactory from '../../domain/repo/factories/repo.factory';
import IConnection from '../database/connection';

export default class PrismaLanguageRepository implements ILanguageRepository {
  private readonly instance: PrismaClient;

  constructor(private readonly dbConnection: IConnection<PrismaClient>) {
    this.instance = this.dbConnection.connect();
  }

  async createMany(data: Language[]): Promise<void> {
    const prepare = data.map((language) => {
      return this.instance.language.create({
        data: {
          id: language.id,
          name: language.name,
          repos: language.repos.map((repo) => ({
            name: repo.name,
            description: repo.description,
            githubId: repo.githubId,
            fullName: repo.fullName,
            private: repo.private,
            owner: repo.owner,
            url: repo.url,
            contributors: repo.contributors,
            homePage: repo.homePage,
            stargazers: repo.stargazers,
            visibility: repo.visibility,
          })),
        },
      });
    });

    await this.instance.$transaction(prepare);
  }

  async getManyByIds(data: string[]): Promise<Language[]> {
    const result = await this.instance.language.findMany({
      where: { id: { in: data } },
    });
    return result.map((language) => {
      const repos = language.repos.map(RepoFactory.create);
      return LanguageFactory.createWithoutRepo(language, repos);
    });
  }
}
