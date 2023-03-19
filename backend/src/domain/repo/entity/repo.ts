import UniqueIdentifier from '../../@shared/value-objects/unique-identifier';
import Contributor from '../value-object/contributor';
import Owner from '../value-object/owner';

export default class Repo {
  private readonly _id: UniqueIdentifier;

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
    private readonly _language: string, // Language Entity
    private readonly _license: string, // value object
    private readonly _visibility: string,
    id?: string
  ) {
    this._id = id ? new UniqueIdentifier(id) : new UniqueIdentifier();
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
  get language(): string {
    return this._language;
  }
  get license(): string {
    return this._license;
  }
  get visibility(): string {
    return this._visibility;
  }
}
