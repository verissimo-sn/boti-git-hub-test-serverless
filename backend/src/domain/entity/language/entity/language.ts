import UniqueIdentifier from '../../@shared/value-objects/unique-identifier';

export default class Languages {
  constructor(
    private readonly id: UniqueIdentifier,
    private readonly name: string,
    private readonly lastUpdate: Date,
    private readonly repositories: string[]
  ) { }

  public getId(): string {
    return this.id.value;
  }
}
