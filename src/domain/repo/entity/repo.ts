import { z } from 'zod';

import Contributor from '../value-object/contributor';
import Owner from '../value-object/owner';

export default class Repo {
  constructor(
    private readonly _githubId: number,
    private readonly _name: string,
    private readonly _description: string,
    private readonly _fullName: string,
    private readonly _private: boolean,
    private readonly _owner: Owner,
    private readonly _url: string,
    private readonly _contributors: Contributor[],
    private readonly _homePage: string,
    private readonly _stargazers: number,
    private readonly _visibility: string
  ) {
    this.validate();
  }

  private validate() {
    const repoSchema = z.object({
      githubId: z.number(),
      name: z.string().nonempty(),
      description: z.string().nonempty(),
      fullName: z.string().nonempty(),
      private: z.boolean(),
      owner: z.any(),
      url: z.any().default(''),
      contributors: z.array(z.any()).nonempty(),
      homePage: z.any().default(''),
      stargazers: z.number(),
      visibility: z.string(),
    });
    repoSchema.parse({
      githubId: this.githubId,
      name: this.name,
      description: this.description,
      fullName: this.fullName,
      private: this.private,
      owner: this.owner,
      url: this.url,
      contributors: this.contributors,
      homePage: this.homePage,
      stargazers: this.stargazers,
      visibility: this.visibility,
    });
  }
  get githubId(): number {
    return this._githubId;
  }
  get name(): string {
    return this._name;
  }
  get description(): string {
    return this._description;
  }
  get fullName(): string {
    return this._fullName;
  }
  get private(): boolean {
    return this._private;
  }
  get owner() {
    return {
      name: this._owner.name,
      avatarUrl: this._owner.avatarUrl,
      pageUrl: this._owner.pageUrl,
    };
  }
  get url(): string {
    return this._url;
  }
  get contributors() {
    return this._contributors.map((contributor) => ({
      name: contributor.name,
      avatarUrl: contributor.avatarUrl,
      pageUrl: contributor.pageUrl,
    }));
  }
  get homePage(): string {
    return this._homePage;
  }
  get stargazers(): number {
    return this._stargazers;
  }
  get visibility(): string {
    return this._visibility;
  }
}
