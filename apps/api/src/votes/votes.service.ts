import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VotesService {
  constructor(private readonly prisma: PrismaService = new PrismaService()) {}

  async list() {
    if (this.prisma.connected) {
      return this.prisma.vote.findMany({ orderBy: { createdAt: 'desc' } });
    }

    return [];
  }

  async create(dto: any) {
    if (this.prisma.connected) {
      return this.prisma.vote.create({
        data: {
          competitionId: dto.competitionId,
          contestantId: dto.contestantId,
          source: dto.source,
          quantity: dto.quantity ?? 1,
          phoneNumber: dto.phoneNumber,
          paymentReference: dto.paymentReference,
          gateway: dto.gateway,
          amount: dto.amount,
          ipAddress: dto.ipAddress,
          deviceInfo: dto.deviceInfo,
        },
      });
    }

    return { id: `vote-${Date.now()}`, ...dto };
  }
}
