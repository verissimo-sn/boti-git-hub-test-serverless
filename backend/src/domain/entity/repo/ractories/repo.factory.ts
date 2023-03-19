import Repo from '../entity/repo';

export default class RepoFactory {
  static create(props: RepoProps) {
    return new Repo(
      props.githubId,
      props.name,
      props.description,
      props.fullName,
      props.private,
      props.owner,
      props.url,
      props.contribuitors,
      props.homePage,
      props.stargazers,
      props.language,
      props.license,
      props.visibility,
      props?.id
    );
  }
}

type RepoProps = Pick<Repo, keyof Omit<Repo, 'id'>> & {
  id?: string;
};
