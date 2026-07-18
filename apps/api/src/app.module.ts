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

@Module({
  imports: [],
  controllers: [AppController, AuthController, CompetitionsController, VotesController],
  providers: [AppService, AuthService, CompetitionsService, VotesService, PrismaService],
})
export class AppModule {}
