import { Injectable } from '@nestjs/common';

@Injectable()
export class NewsService {
  private items = [
    {
      id: 'news-1',
      title: 'Creative Passport launches a new arts hub for the continent',
      category: 'Arts News',
      excerpt: 'A new platform for artists, competitions, and creative discovery is now live across South Africa and beyond.',
      author: 'Lerato Mokoena',
      image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
      publishedAt: '2026-07-17T09:00:00.000Z',
      readingTime: '4 min read',
      views: 1820,
      country: 'South Africa',
      province: 'Western Cape',
      status: 'PUBLISHED',
    },
    {
      id: 'news-2',
      title: 'Young poets shine as national competition celebrates fresh voices',
      category: 'Culture',
      excerpt: 'Winners from across the country were honoured this week in a landmark ceremony for emerging literary talent.',
      author: 'Sam Boert',
      image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80',
      publishedAt: '2026-07-16T14:30:00.000Z',
      readingTime: '3 min read',
      views: 1460,
      country: 'South Africa',
      province: 'Gauteng',
      status: 'PUBLISHED',
    },
    {
      id: 'news-3',
      title: 'Festival season drives a new wave of artist opportunities',
      category: 'Business',
      excerpt: 'Organisers are opening more grants, residencies, and live performance slots for early-career creatives.',
      author: 'Maya Dlamini',
      image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80',
      publishedAt: '2026-07-15T18:45:00.000Z',
      readingTime: '5 min read',
      views: 1280,
      country: 'South Africa',
      province: 'KwaZulu-Natal',
      status: 'PUBLISHED',
    },
  ];

  async list() {
    return [...this.items]
      .filter((item) => item.status === 'PUBLISHED')
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
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
