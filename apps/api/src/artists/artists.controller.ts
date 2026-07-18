import { Body, Controller, Get, Post, Param, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ArtistsService } from './artists.service';

@ApiTags('artists')
@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  @ApiOperation({ summary: 'List artists' })
  list() {
    return this.artistsService.list();
  }

  @Post()
  @ApiOperation({ summary: 'Create an artist profile' })
  create(@Body() dto: any) {
    return this.artistsService.create(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an artist profile' })
  get(@Param('id') id: string) {
    return this.artistsService.get(id);
  }
}
