import { Injectable } from '@nestjs/common';

@Injectable()
export class EventsService {
  private items = [
    {
      id: 'event-1',
      title: 'Cape Town Poetry Night',
      category: 'Poetry Festival',
      venue: 'Theatre on the Bay',
      country: 'South Africa',
      province: 'Western Cape',
    },
  ];

  async list() {
    return this.items;
  }

  async create(dto: any) {
    const item = { id: `event-${Date.now()}`, ...dto };
    this.items.push(item);
    return item;
  }

  async get(id: string) {
    return this.items.find((item) => item.id === id);
  }
}
