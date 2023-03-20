import axiosRepoFakeData from '../../../../mocks/get-repos-github-mock.json';
import Language from '../../../domain/language/entity/language';
import AxiosGithubRepoDataMapper from './axios-repo-data-mapper';

describe('Unit: AxiosRepoDataMapper', () => {
  it('should map repo data', () => {
    const language = new Language('JavaScript');
    const contributor = {
      login: 'fake_url',
      avatar_url: 'fake_url',
      html_url: 'fake_url',
    };
    const fakeAxiosData = axiosRepoFakeData.items.map((repo) => ({
      ...repo,
      contributors: [contributor],
    }));
    const mapper = AxiosGithubRepoDataMapper.toRepoPropList(
      fakeAxiosData,
      language.id
    );
    expect(mapper).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          githubId: expect.any(Number),
          name: expect.any(String),
          description: expect.any(String),
          fullName: expect.any(String),
          private: expect.any(Boolean),
          owner: expect.objectContaining({
            name: expect.any(String),
            avatarUrl: expect.any(String),
            pageUrl: expect.any(String),
          }),
          url: expect.any(String),
          contributors: expect.arrayContaining([
            expect.objectContaining({
              name: expect.any(String),
              avatarUrl: expect.any(String),
              pageUrl: expect.any(String),
            }),
          ]),
          homePage: expect.any(String),
          stargazers: expect.any(Number),
          visibility: expect.any(String),
          languageId: language.id,
        }),
      ])
    );
  });
});
