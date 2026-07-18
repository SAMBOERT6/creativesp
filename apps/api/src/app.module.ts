import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { CompetitionsController } from './competitions/competitions.controller';
import { CompetitionsService } from './competitions/competitions.service';
import { VotesController } from './votes/votes.controller';
import { VotesService } from './votes/votes.service';
import { PrismaService } from './prisma/prisma.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RolesGuard } from './common/roles.guard';
import { ContestantsController } from './contestants/contestants.controller';
import { ContestantsService } from './contestants/contestants.service';
import { AdminController } from './admin/admin.controller';
import { AdminService } from './admin/admin.service';
import { seedDatabase } from './seed-data';

@Module({
  imports: [],
  controllers: [AppController, AuthController, CompetitionsController, ContestantsController, VotesController, AdminController],
  providers: [
    AppService,
    AuthService,
    CompetitionsService,
    ContestantsService,
    VotesService,
    AdminService,
    PrismaService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    await this.prisma.onModuleInit();
    await seedDatabase(this.prisma);
  }
}
