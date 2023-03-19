import UniqueIdentifier from '../../@shared/value-objects/unique-identifier';
import Language from './language';

describe('Unit: Language entity', () => {
  it('should create a language', () => {
    const languageProps = {
      name: 'go',
    };
    const language = new Language(languageProps.name);
    expect(language.id).toBeDefined();
    expect(language.name).toBe(languageProps.name);
    expect(language.lastUpdate).toBeInstanceOf(Date);
  });

  it('should restore a language', () => {
    const languageProps = {
      name: 'go',
      lastUpdate: new Date(),
      id: new UniqueIdentifier().value,
    };
    const language = new Language(
      languageProps.name,
      languageProps.id,
      languageProps.lastUpdate
    );
    expect(language.id).toStrictEqual(languageProps.id);
    expect(language.lastUpdate).toStrictEqual(languageProps.lastUpdate);
    expect(language.id).toStrictEqual(languageProps.id);
  });
});
