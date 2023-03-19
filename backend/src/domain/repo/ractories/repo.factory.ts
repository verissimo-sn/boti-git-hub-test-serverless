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
    const contribuitors = props.contribuitors.map((contributor) => {
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
      contribuitors,
      props.homePage,
      props.stargazers,
      props.language,
      props.visibility,
      props?.id
    );
  }
}

type RepoProps = Pick<Repo, keyof Omit<Repo, 'id'>> & {
  id?: string;
  owner: Pick<Owner, keyof Owner>;
  contribuitors: Pick<Contributor, keyof Contributor>[];
};
