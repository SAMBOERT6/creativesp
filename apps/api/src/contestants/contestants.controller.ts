import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../common/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/roles.guard';
import { ContestantsService } from './contestants.service';

class CreateContestantDto {
  fullName: string;
  bio?: string;
  province?: string;
  country?: string;
  competitionId: string;
}

@ApiTags('contestants')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('contestants')
export class ContestantsController {
  constructor(private readonly contestantsService: ContestantsService) {}

  @Get()
  @Roles('SUPER_ADMIN', 'PLATFORM_ADMIN', 'ORGANIZER', 'CONTESTANT')
  @ApiOperation({ summary: 'List contestants' })
  list() {
    return this.contestantsService.list();
  }

  @Post()
  @Roles('SUPER_ADMIN', 'PLATFORM_ADMIN', 'ORGANIZER', 'CONTESTANT')
  @ApiOperation({ summary: 'Create contestant' })
  create(@Body() dto: CreateContestantDto) {
    return this.contestantsService.create(dto);
  }

  @Get(':id')
  @Roles('SUPER_ADMIN', 'PLATFORM_ADMIN', 'ORGANIZER', 'CONTESTANT')
  @ApiOperation({ summary: 'Get contestant by id' })
  get(@Param('id') id: string) {
    return this.contestantsService.get(id);
  }
}
