import { z } from 'zod';

import UniqueIdentifier from '../../@shared/value-objects/unique-identifier';
import Repo from '../../repo/entity/repo';

export default class Language {
  private readonly _id: UniqueIdentifier;
  private readonly _repos: Repo[] = [];

  constructor(private readonly _name: string, id?: string) {
    this._id = id ? new UniqueIdentifier(id) : new UniqueIdentifier();
    this.validate();
  }

  private validate() {
    const languageSchema = z.object({
      id: z.string().nonempty(),
      name: z.string().nonempty(),
      repos: z.array(z.any()),
    });
    languageSchema.parse({
      id: this.id,
      name: this.name,
      repos: this.repos,
    });
  }

  get id(): string {
    return this._id.value;
  }

  get name(): string {
    return this._name;
  }

  get repos() {
    return this._repos.map((repo) => ({
      githubId: repo.githubId,
      name: repo.name,
      description: repo.description,
      fullName: repo.fullName,
      private: repo.private,
      owner: repo.owner,
      url: repo.url,
      contributors: repo.contributors,
      homePage: repo.homePage,
      stargazers: repo.stargazers,
      visibility: repo.visibility,
    }));
  }

  addRepo(repo: Repo) {
    this._repos.push(repo);
    this.validate();
  }
}
