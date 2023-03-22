import Language from '../../domain/language/entity/language';
import ILanguageRepository from '../repository/language.repository';
import SaveUnregisteredLanguagesService from './save-unregistered-languages.service';
import IService from './services.interface';

describe('Unit: SaveUnregisteredLanguagesService', () => {
  let languageRepository: ILanguageRepository;
  let service: IService<Language[], void>;

  beforeEach(() => {
    languageRepository = {
      createMany: jest.fn(),
    } as any;
    service = new SaveUnregisteredLanguagesService(languageRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return an array of languages', async () => {
    const languages = [new Language('javascript')];
    const spyRepository = jest.spyOn(languageRepository, 'createMany');
    await service.execute(languages);
    expect(spyRepository).toHaveBeenCalledWith(languages);
  });

  it('should log error when occurred error on save language from repository', async () => {
    jest.spyOn(languageRepository, 'createMany').mockRejectedValue(new Error());
    jest.spyOn(console, 'log').mockImplementation((message) => {
      expect(message).toBe('Error saving unregistered languages');
    });
    await expect(
      service.execute([new Language('javascript')])
    ).rejects.toThrowError();
  });
});
