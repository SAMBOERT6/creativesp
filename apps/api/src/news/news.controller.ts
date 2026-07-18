import { Body, Controller, Get, Post, Param, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { NewsService } from './news.service';

@ApiTags('news')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  @ApiOperation({ summary: 'List news articles' })
  list() {
    return this.newsService.list();
  }

  @Post()
  @ApiOperation({ summary: 'Create a news article' })
  create(@Body() dto: any) {
    return this.newsService.create(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a news article' })
  get(@Param('id') id: string) {
    return this.newsService.get(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a news article' })
  update(@Param('id') id: string, @Body() dto: any) {
    return this.newsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a news article' })
  remove(@Param('id') id: string) {
    return this.newsService.remove(id);
  }
}
