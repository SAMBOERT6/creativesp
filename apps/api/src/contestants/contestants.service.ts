import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ContestantsService {
  constructor(private readonly prisma: PrismaService = new PrismaService()) {}

  async list() {
    if (this.prisma.connected) {
      return this.prisma.contestant.findMany({ orderBy: { createdAt: 'desc' } });
    }

    return [];
  }

  async create(dto: any) {
    if (this.prisma.connected) {
      return this.prisma.contestant.create({ data: dto });
    }

    return { id: `cnt-${Date.now()}`, ...dto };
  }

  async get(id: string) {
    if (this.prisma.connected) {
      return this.prisma.contestant.findUnique({ where: { id } });
    }

    return { id };
  }
}
