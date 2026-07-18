import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { VotesService } from './votes.service';

class CreateVoteDto {
  competitionId: string;
  contestantId: string;
  source: 'ONLINE' | 'SMS' | 'ADMIN_BONUS' | 'SPONSOR_BONUS';
  quantity?: number;
  phoneNumber?: string;
  paymentReference?: string;
  gateway?: string;
  amount?: number;
  ipAddress?: string;
  deviceInfo?: string;
}

@ApiTags('votes')
@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @Get()
  @ApiOperation({ summary: 'List votes' })
  list() {
    return this.votesService.list();
  }

  @Post()
  @ApiOperation({ summary: 'Submit a vote' })
  create(@Body() dto: CreateVoteDto) {
    return this.votesService.create(dto);
  }
}
