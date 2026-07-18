import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService = new PrismaService()) {}

  async dashboard() {
    if (this.prisma.connected) {
      const [competitions, contestants, votes, users] = await Promise.all([
        this.prisma.competition.count(),
        this.prisma.contestant.count(),
        this.prisma.vote.count(),
        this.prisma.user.count(),
      ]);

      return { competitions, contestants, votes, users };
    }

    return { competitions: 0, contestants: 0, votes: 0, users: 0 };
  }
}
