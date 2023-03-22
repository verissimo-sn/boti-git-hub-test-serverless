import { APIGatewayProxyEvent } from 'aws-lambda';
import axios from 'axios';

import GetLanguageFromGithubService from '../../application/services/get-language-from-github.service';
import GetRegisteredLanguagesService from '../../application/services/get-registered-languages.service';
import SaveUnregisteredLanguagesService from '../../application/services/save-unregistered-languages.service';
import GetReposByLanguagesUseCase from '../../application/useCase/get-repos-by-languages.useCase';
import PrismaAdapter from '../../infra/database/prisma-adapter';
import RepoGatewayHttp from '../../infra/gateway/repo-gateway-http';
import AxiosAdapter from '../../infra/http/axios-adapter';
import LanguagePresenter from '../../infra/presenters/language.presenter';
import PrismaLanguageRepository from '../../infra/repository/prisma-language.repository';

import('dotenv/config');

const axiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_BEARER_TOKEN}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  },
});
const httpAdapter = new AxiosAdapter(axiosInstance);
const repoGateway = new RepoGatewayHttp(httpAdapter);
const dbAdapter = new PrismaAdapter();
const languageRepository = new PrismaLanguageRepository(dbAdapter);
const getRegisteredLanguagesService = new GetRegisteredLanguagesService(
  languageRepository
);
const getLanguageFromGithubService = new GetLanguageFromGithubService(
  repoGateway
);
const saveUnregisteredLanguagesService = new SaveUnregisteredLanguagesService(
  languageRepository
);
const useCase = new GetReposByLanguagesUseCase(
  getRegisteredLanguagesService,
  getLanguageFromGithubService,
  saveUnregisteredLanguagesService
);

export const main = async (event: APIGatewayProxyEvent) => {
  if (event?.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({
        message: 'Method not allowed',
        data: null,
      }),
    };
  }

  try {
    const result = await useCase.execute();
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Success',
        data: result.map((language) =>
          LanguagePresenter.languageToJSon(language)
        ),
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: error.message,
        data: null,
      }),
    };
  }
};
