import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { NewslettersService } from './newsletters.service';

@ApiTags('newsletters')
@Controller('newsletters')
export class NewslettersController {
  constructor(private readonly newslettersService: NewslettersService) {}

  @Get()
  @ApiOperation({ summary: 'List newsletter subscribers' })
  list() {
    return this.newslettersService.list();
  }

  @Post()
  @ApiOperation({ summary: 'Subscribe to newsletter' })
  subscribe(@Body() dto: { email: string; name?: string }) {
    return this.newslettersService.subscribe(dto);
  }
}
