import UniqueIdentifier from '../../@shared/value-objects/unique-identifier';

export default class Language {
  private readonly _id: UniqueIdentifier;
  private readonly _lastUpdate: Date;

  constructor(private readonly _name: string, id?: string, lastUpdate?: Date) {
    this._id = id ? new UniqueIdentifier(id) : new UniqueIdentifier();
    this._lastUpdate = lastUpdate ?? new Date();
  }

  get id(): string {
    return this._id.value;
  }

  get name(): string {
    return this._name;
  }

  get lastUpdate(): Date {
    return this._lastUpdate;
  }
}
