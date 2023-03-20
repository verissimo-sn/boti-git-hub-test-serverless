import { PrismaClient } from '@prisma/client';

import ILanguageRepository from '../../application/repository/language.repository';
import Language from '../../domain/language/entity/language';
import IConnection from '../database/connection';

export default class PrismaLanguageRepository implements ILanguageRepository {
  constructor(private readonly dbConnection: IConnection<PrismaClient>) { }

  async createMany(data: Language[]): Promise<void> {
    const prisma = await this.dbConnection.connect();
    const prepare = data.map((language) => {
      return prisma.language.create({
        data: {
          id: language.id,
          name: language.name,
          repos: {
            connectOrCreate: language.repos.map((repo) => ({
              create: {
                id: repo.id,
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
              },
              where: { id: repo.id },
            })),
          },
        },
      });
    });

    await prisma.$transaction(prepare);
  }
}
