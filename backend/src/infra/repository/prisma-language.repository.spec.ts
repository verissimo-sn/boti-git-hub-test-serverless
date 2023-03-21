import { PrismaClient } from '@prisma/client';

import ILanguageRepository from '../../application/repository/language.repository';
import UniqueIdentifier from '../../domain/@shared/value-objects/unique-identifier';
import Language from '../../domain/language/entity/language';
import LanguageFactory from '../../domain/language/factories/language.factory';
import RepoFactory from '../../domain/repo/factories/repo.factory';
import IConnection from '../database/connection';
import PrismaAdapter from '../database/prisma-adapter';
import PrismaLanguageRepository from './prisma-language.repository';

describe('Integration: PrismaLanguageRepository', () => {
  let adapter: IConnection<PrismaClient>;
  let repository: ILanguageRepository;
  const fakeLanguages = [
    {
      id: new UniqueIdentifier().value,
      name: 'Go',
      repos: [],
    },
    {
      id: new UniqueIdentifier().value,
      name: 'JavaScript',
      repos: [],
    },
  ];

  beforeAll(async () => {
    process.env.DATABASE_URL = `${process.env.DATABASE_URL}_test`;
    adapter = new PrismaAdapter();
    repository = new PrismaLanguageRepository(adapter);
    await adapter.connect().language.createMany({
      data: fakeLanguages,
    });
  });

  afterAll(async () => {
    const prisma = adapter.connect();
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
      visibility: 'public',
    });
    const language = LanguageFactory.createWithoutRepo(props, [repo]);
    await repository.createMany([language]);
    const prisma = adapter.connect();
    const foundLanguage = await prisma.language.findFirst({
      where: { id: language.id },
      include: { repos: true },
    });
    expect(foundLanguage).toEqual({
      id: language.id,
      name: language.name,
      repos: [
        {
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
          visibility: language.repos[0].visibility,
        },
      ],
    });
  });

  it('should find many languages by id', async () => {
    const foundLanguages = await repository.getManyByIds([
      fakeLanguages[0].id,
      fakeLanguages[1].id,
    ]);
    expect(foundLanguages[0]).toBeInstanceOf(Language);
    expect(foundLanguages[0].id).toBe(fakeLanguages[0].id);
    expect(foundLanguages[0].name).toBe(fakeLanguages[0].name);
  });
});
