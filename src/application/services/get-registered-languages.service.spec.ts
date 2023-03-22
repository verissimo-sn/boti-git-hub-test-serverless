import Language from '../../domain/language/entity/language';
import ILanguageRepository from '../repository/language.repository';
import GetRegisteredLanguagesService from './get-registered-languages.service';
import IService from './services.interface';

describe('Unit: GetRegisteredLanguagesService', () => {
  let languageRepository: ILanguageRepository;
  let service: IService<string[], Language[]>;

  beforeEach(() => {
    languageRepository = {
      getManyByName: jest.fn(),
    } as any;
    service = new GetRegisteredLanguagesService(languageRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return an array of languages', async () => {
    jest
      .spyOn(languageRepository, 'getManyByName')
      .mockResolvedValue([new Language('javascript')]);

    const result = await service.execute(['javascript']);
    expect(result).toBeInstanceOf(Array);
    expect(result[0]).toBeInstanceOf(Language);
    expect(result[0].name).toBe('javascript');
  });

  it('should log error when occurred error on get language from repository', async () => {
    jest
      .spyOn(languageRepository, 'getManyByName')
      .mockRejectedValue(new Error());
    jest.spyOn(console, 'log').mockImplementation((message) => {
      expect(message).toBe('Error getting registered languages');
    });
    await expect(service.execute(['javascript'])).rejects.toThrowError();
  });
});
