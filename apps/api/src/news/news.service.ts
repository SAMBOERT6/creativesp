import { Injectable } from '@nestjs/common';

@Injectable()
export class NewsService {
  private items = [
    {
      id: 'news-1',
      title: 'Creative Passport launches new arts hub',
      category: 'Arts News',
      excerpt: 'A new platform for artists, competitions, and creative discovery is now live.',
      country: 'South Africa',
      province: 'Western Cape',
      status: 'PUBLISHED',
    },
  ];

  async list() {
    return this.items;
  }

  async create(dto: any) {
    const item = { id: `news-${Date.now()}`, ...dto, status: dto.status ?? 'DRAFT' };
    this.items.push(item);
    return item;
  }

  async get(id: string) {
    return this.items.find((item) => item.id === id);
  }

  async update(id: string, dto: any) {
    const item = this.items.find((entry) => entry.id === id);
    if (!item) {
      throw new Error('News article not found');
    }
    Object.assign(item, dto);
    return item;
  }

  async remove(id: string) {
    const index = this.items.findIndex((entry) => entry.id === id);
    if (index === -1) {
      throw new Error('News article not found');
    }
    this.items.splice(index, 1);
    return { id };
  }
}
