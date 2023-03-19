import { randomUUID } from 'node:crypto';

export default class UniqueIdentifier {
  private readonly _value: string;

  constructor(id?: string) {
    this._value = id || this.generate();
    this.validate();
  }

  private generate(): string {
    return randomUUID();
  }

  private validate() {
    const regex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    if (!regex.test(this._value)) {
      throw new Error('Invalid UUID');
    }
  }

  get value(): string {
    return this._value;
  }
}
