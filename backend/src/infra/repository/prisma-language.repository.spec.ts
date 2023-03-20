import { PrismaClient } from '@prisma/client';

import ILanguageRepository from '../../application/repository/language.repository';
import Language from '../../domain/language/entity/language';
import LanguageFactory from '../../domain/language/factories/language.factory';
import RepoFactory from '../../domain/repo/factories/repo.factory';
import IConnection from '../database/connection';
import PrismaAdapter from '../database/prisma-adapter';
import PrismaLanguageRepository from './prisma-language.repository';

describe('PrismaLanguageRepository', () => {
  let adapter: IConnection<PrismaClient>;
  let repository: ILanguageRepository;

  beforeEach(async () => {
    process.env.DATABASE_URL = 'mongodb://localhost:27017/gb_languages_test';
    adapter = new PrismaAdapter();
    repository = new PrismaLanguageRepository(adapter);
  });

  afterAll(async () => {
    const prisma = await adapter.connect();
    await prisma.repo.deleteMany();
    await prisma.language.deleteMany();
    prisma.$disconnect();
  });

  it('should create many languages', async () => {
    const props = new Language('Go');
    const repo = RepoFactory.create({
      githubId: 23096959,
      name: 'go',
      description: 'The Go programming language',
      fullName: 'golang/go',
      private: false,
      owner: {
        name: 'golang',
        avatarUrl: 'https://avatars.githubusercontent.com/u/4314092?v=4',
        pageUrl: 'asd',
      },
      url: 'asd',
      contributors: [
        {
          name: 'rsc',
          avatarUrl: 'https://avatars.githubusercontent.com/u/104030?v=4',
          pageUrl: 'asd',
        },
      ],
      homePage: 'https://go.dev',
      stargazers: 109460,
      languageId: props.id,
      visibility: 'public',
    });
    const language = LanguageFactory.createWithoutRepo(props, [repo]);
    await repository.createMany([language]);
    const prisma = await adapter.connect();
    const foundLanguage = await prisma.language.findFirst({
      where: { id: language.id },
      include: { repos: true },
    });
    expect(foundLanguage).toEqual({
      id: language.id,
      name: language.name,
      repos: [
        {
          id: language.repos[0].id,
          githubId: language.repos[0].githubId,
          name: language.repos[0].name,
          description: language.repos[0].description,
          fullName: language.repos[0].fullName,
          private: language.repos[0].private,
          owner: language.repos[0].owner,
          url: language.repos[0].url,
          contributors: language.repos[0].contributors,
          homePage: language.repos[0].homePage,
          stargazers: language.repos[0].stargazers,
          languageId: language.repos[0].languageId,
          visibility: language.repos[0].visibility,
        },
      ],
    });
  });
});
