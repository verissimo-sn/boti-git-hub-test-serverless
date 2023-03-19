import UniqueIdentifier from './unique-identifier';

describe('UniqueIdentifier Value Object', () => {
  it('should generate a valid UUID', () => {
    const uuid = new UniqueIdentifier();
    expect(uuid.value).toMatch(
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/
    );
  });

  it('should throw error when provided invalid UUID', () => {
    expect(() => new UniqueIdentifier('any string')).toThrowError(
      'Invalid UUID'
    );
  });
});
