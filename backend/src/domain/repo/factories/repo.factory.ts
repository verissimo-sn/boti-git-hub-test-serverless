import Repo from '../entity/repo';
import Contributor from '../value-object/contributor';
import Owner from '../value-object/owner';

export default class RepoFactory {
  static create(props: RepoProps) {
    const owner = new Owner(
      props.owner.name,
      props.owner.avatarUrl,
      props.owner.pageUrl
    );
    const contributors = props.contributors.map((contributor) => {
      return new Contributor(
        contributor.name,
        contributor.avatarUrl,
        contributor.pageUrl
      );
    });
    return new Repo(
      props.githubId,
      props.name,
      props.description,
      props.fullName,
      props.private,
      owner,
      props.url,
      contributors,
      props.homePage,
      props.stargazers,
      props.visibility
    );
  }
}

type RepoProps = Pick<Repo, keyof Omit<Repo, 'id'>> & {
  id?: string;
  owner: Pick<Owner, keyof Owner>;
  contributors: Pick<Contributor, keyof Contributor>[];
};
