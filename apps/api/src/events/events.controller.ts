import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { EventsService } from './events.service';

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  @ApiOperation({ summary: 'List events' })
  list() {
    return this.eventsService.list();
  }

  @Post()
  @ApiOperation({ summary: 'Create an event' })
  create(@Body() dto: any) {
    return this.eventsService.create(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an event' })
  get(@Param('id') id: string) {
    return this.eventsService.get(id);
  }
}
