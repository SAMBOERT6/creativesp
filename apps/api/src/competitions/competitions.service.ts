import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CompetitionsService {
  private fallbackCompetitions = [
    {
      id: 'cmp-001',
      name: 'Poetry of the Future',
      category: 'Poetry',
      country: 'South Africa',
      province: 'Western Cape',
      status: 'ACTIVE',
    },
  ];

  constructor(private readonly prisma: PrismaService = new PrismaService()) {}

  async list() {
    if (this.prisma.connected) {
      return this.prisma.competition.findMany({ orderBy: { createdAt: 'desc' } });
    }

    return this.fallbackCompetitions;
  }

  async create(dto: any) {
    if (this.prisma.connected) {
      return this.prisma.competition.create({
        data: {
          name: dto.name,
          description: dto.description,
          category: dto.category,
          country: dto.country,
          province: dto.province,
          organizerId: dto.organizerId,
          status: 'DRAFT',
        },
      });
    }

    const item = { id: `cmp-${Date.now()}`, ...dto, status: 'DRAFT' };
    this.fallbackCompetitions.push(item);
    return item;
  }
}
