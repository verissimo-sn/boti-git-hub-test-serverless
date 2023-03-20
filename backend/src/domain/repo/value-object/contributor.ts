import { z } from 'zod';

export default class Contributor {
  constructor(
    private readonly _name: string,
    private readonly _avatarUrl: string,
    private readonly _pageUrl: string
  ) {
    this.validate();
  }

  private validate() {
    const contributorSchema = z.object({
      name: z.string().nonempty(),
      avatarUrl: z.string().nonempty(),
      pageUrl: z.any().default(''),
    });
    contributorSchema.parse({
      name: this._name,
      avatarUrl: this._avatarUrl,
      pageUrl: this._pageUrl,
    });
  }

  get name(): string {
    return this._name;
  }
  get avatarUrl(): string {
    return this._avatarUrl;
  }
  get pageUrl(): string {
    return this._pageUrl;
  }
}
