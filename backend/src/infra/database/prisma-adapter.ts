import { PrismaClient } from '@prisma/client';

import IConnection from './connection';

export default class PrismaAdapter implements IConnection<PrismaClient> {
  private readonly connection: PrismaClient;

  constructor() {
    const prisma = new PrismaClient();
    this.connection = prisma;
  }

  connect(): PrismaClient {
    return this.connection;
  }

  async disconnect(): Promise<void> {
    await this.connection.$disconnect();
  }
}
