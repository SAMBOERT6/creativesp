import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CompetitionsService } from './competitions.service';

class CreateCompetitionDto {
  name: string;
  description?: string;
  category: string;
  country: string;
  province?: string;
  organizerId: string;
}

@ApiTags('competitions')
@Controller('competitions')
export class CompetitionsController {
  constructor(private readonly competitionsService: CompetitionsService) {}

  @Get()
  @ApiOperation({ summary: 'List competitions' })
  @ApiResponse({ status: 200, description: 'Competitions retrieved successfully.' })
  list() {
    return this.competitionsService.list();
  }

  @Post()
  @ApiOperation({ summary: 'Create a competition' })
  create(@Body() dto: CreateCompetitionDto) {
    return this.competitionsService.create(dto);
  }
}
