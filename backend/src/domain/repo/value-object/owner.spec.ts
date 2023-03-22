import Owner from './owner';

describe('Unit: Owner VO', () => {
  it('should create a owner', () => {
    const props = {
      name: 'golang',
      avatarUrl: 'https://avatars.githubusercontent.com/u/4314092?v=4',
      pageUrl: 'https://github.com/golang',
    };
    const owner = new Owner(props.name, props.avatarUrl, props.pageUrl);
    expect(owner.name).toBe(props.name);
    expect(owner.avatarUrl).toBe(props.avatarUrl);
    expect(owner.pageUrl).toBe(props.pageUrl);
  });

  it('should throw error when try create a invalid Owner', () => {
    const props = {
      name: '',
      avatarUrl: '',
      pageUrl: '',
    };
    expect(
      () => new Owner(props.name, props.avatarUrl, props.pageUrl)
    ).toThrowError();
  });
});
