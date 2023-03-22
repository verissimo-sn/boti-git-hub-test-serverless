import fakeGithubResponse from '../../../mocks/get-repos-github-mock.json';
import Language from '../../domain/language/entity/language';
import RepoGatewayHttp from '../../infra/gateway/repo-gateway-http';
import IRepoGateway from '../gateway/repo-gateway';
import GetLanguageFromGithubService from './get-language-from-github.service';
import IService from './services.interface';

describe('Integration: GetLanguageFromGithubService', () => {
  let httpAdapter: any;
  let repoGateway: IRepoGateway;
  let service: IService<string[], Language[]>;

  beforeEach(() => {
    httpAdapter = {
      get: jest.fn(),
    };
    repoGateway = new RepoGatewayHttp(httpAdapter as any);
    service = new GetLanguageFromGithubService(repoGateway);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return an array of languages', async () => {
    httpAdapter.get.mockResolvedValueOnce(fakeGithubResponse);
    httpAdapter.get.mockResolvedValue([
      {
        login: 'fake_login',
        avatar_url: 'fae_avatar_url',
        html_url: 'fake_html_url',
      },
    ]);
    const result = await service.execute(['javascript']);
    expect(result).toBeInstanceOf(Array);
    expect(result[0]).toBeInstanceOf(Language);
    expect(result[0].name).toBe('javascript');
  });

  it('should log error when occurred error on get language from github', async () => {
    jest.spyOn(repoGateway, 'getByLanguage').mockRejectedValue(new Error());
    jest.spyOn(console, 'log').mockImplementation((message) => {
      expect(message).toBe('Error getting languages from Github');
    });
    await expect(service.execute(['javascript'])).rejects.toThrowError();
  });
});
