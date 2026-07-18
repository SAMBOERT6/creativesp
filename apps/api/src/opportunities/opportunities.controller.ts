import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { OpportunitiesService } from './opportunities.service';

@ApiTags('opportunities')
@Controller('opportunities')
export class OpportunitiesController {
  constructor(private readonly opportunitiesService: OpportunitiesService) {}

  @Get()
  @ApiOperation({ summary: 'List opportunities' })
  list() {
    return this.opportunitiesService.list();
  }

  @Post()
  @ApiOperation({ summary: 'Create an opportunity' })
  create(@Body() dto: any) {
    return this.opportunitiesService.create(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an opportunity' })
  get(@Param('id') id: string) {
    return this.opportunitiesService.get(id);
  }
}
