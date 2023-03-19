import { z } from 'zod';

import UniqueIdentifier from '../../@shared/value-objects/unique-identifier';
import Contributor from '../value-object/contributor';
import Owner from '../value-object/owner';

export default class Repo {
  private readonly _id: UniqueIdentifier;
  private readonly _languageId: UniqueIdentifier;

  constructor(
    private readonly _githubId: number,
    private readonly _name: string,
    private readonly _description: string,
    private readonly _fullName: string,
    private readonly _private: boolean,
    private readonly _owner: Owner,
    private readonly _url: string,
    private readonly _contribuitors: Contributor[],
    private readonly _homePage: string,
    private readonly _stargazers: number,
    languageId: string,
    private readonly _visibility: string,
    id?: string
  ) {
    this._id = id ? new UniqueIdentifier(id) : new UniqueIdentifier();
    this._languageId = new UniqueIdentifier(languageId);
    this.validate();
  }

  private validate() {
    const repoSchema = z.object({
      id: z.string().nonempty(),
      githubId: z.number(),
      name: z.string().nonempty(),
      description: z.string().nonempty(),
      fullName: z.string().nonempty(),
      private: z.boolean(),
      owner: z.any(),
      url: z.string().nonempty(),
      contribuitors: z.array(z.any()).nonempty(),
      homePage: z.string().nonempty(),
      stargazers: z.number(),
      languageId: z.string().nonempty(),
      visibility: z.string().nonempty(),
    });
    repoSchema.parse({
      id: this.id,
      githubId: this.githubId,
      name: this.name,
      description: this.description,
      fullName: this.fullName,
      private: this.private,
      owner: this.owner,
      url: this.url,
      contribuitors: this.contribuitors,
      homePage: this.homePage,
      stargazers: this.stargazers,
      languageId: this.languageId,
      visibility: this.visibility,
    });
  }

  get id(): string {
    return this._id.value;
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
  get contribuitors() {
    return this._contribuitors.map((contributor) => ({
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
  get languageId(): string {
    return this._languageId.value;
  }
  get visibility(): string {
    return this._visibility;
  }
}
