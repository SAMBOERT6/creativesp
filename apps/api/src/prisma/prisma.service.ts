import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  public connected = false;

  async onModuleInit() {
    try {
      await this.$connect();
      this.connected = true;
    } catch {
      this.connected = false;
    }
  }
}
