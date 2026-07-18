import { Injectable } from '@nestjs/common';

@Injectable()
export class VotesService {
  private votes = [
    {
      id: 'vote-001',
      competitionId: 'cmp-001',
      contestantId: 'cnt-001',
      source: 'ONLINE',
      quantity: 5,
      amount: 10,
      gateway: 'PayFast',
    },
  ];

  list() {
    return this.votes;
  }

  create(dto: any) {
    const item = { id: `vote-${Date.now()}`, ...dto };
    this.votes.push(item);
    return item;
  }
}
