import UniqueIdentifier from '@domain/entity/@shared/value-objects/unique-identifier';

import Language from '../entity/language';
import LanguageFactory from './language.factory';

describe('Unit: Language factory', () => {
  it('should build a language entity', () => {
    const props = {
      name: 'Go',
    };
    const language = LanguageFactory.create(props);
    expect(language).toBeInstanceOf(Language);
    expect(language.id).toBeDefined();
    expect(language.name).toStrictEqual(props.name);
    expect(language.lastUpdate).toBeInstanceOf(Date);
  });

  it('should build a language entity all props', () => {
    const props = {
      name: 'Go',
      lastUpdate: new Date(),
      id: new UniqueIdentifier().value,
    };
    const language = LanguageFactory.create(props);
    expect(language).toBeInstanceOf(Language);
    expect(language.id).toStrictEqual(props.id);
    expect(language.lastUpdate).toStrictEqual(props.lastUpdate);
    expect(language.name).toStrictEqual(props.name);
  });
});
