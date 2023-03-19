import Contributor from './contributor';

describe('Unit: Contributor VO', () => {
  it('should create a Contributor', () => {
    const contributorProps = {
      name: 'rsc',
      avatarUrl: 'https://avatars.githubusercontent.com/u/104030?v=4',
      pageUrl: 'https://github.com/rsc',
    };
    const contributor = new Contributor(
      contributorProps.name,
      contributorProps.avatarUrl,
      contributorProps.pageUrl
    );
    expect(contributor.name).toStrictEqual(contributorProps.name);
    expect(contributor.avatarUrl).toStrictEqual(contributorProps.avatarUrl);
    expect(contributor.pageUrl).toStrictEqual(contributorProps.pageUrl);
  });

  it('should validate a Contributor', () => {
    const contributorProps = {
      name: '',
      avatarUrl: '',
      pageUrl: '',
    };
    expect(
      () =>
        new Contributor(
          contributorProps.name,
          contributorProps.avatarUrl,
          contributorProps.pageUrl
        )
    ).toThrowError();
  });
});
