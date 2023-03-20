import { APIGatewayProxyEvent } from 'aws-lambda';
import axios from 'axios';

import GetBestLanguagesUseCase from '../../application/useCase/get-best-languages-repos';
import RepoGatewayHttp from '../../infra/gateway/repo-gateway-http';
import AxiosAdapter from '../../infra/http/axios-adapter';
import LanguagePresenter from '../../infra/presenters/language.presenter';

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
const useCase = new GetBestLanguagesUseCase(repoGateway);

export const main = async (event: APIGatewayProxyEvent) => {
  console.log(process.env.GITHUB_BEARER_TOKEN);
  if (event?.httpMethod !== 'GET') {
    return {
      statusCode: 400,
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
