import { Injectable } from '@nestjs/common';

@Injectable()
export class ArtistsService {
  private items = [
    {
      id: 'artist-1',
      fullName: 'Enos Sambo',
      stageName: 'Enos',
      discipline: 'Poet',
      country: 'South Africa',
      province: 'Western Cape',
      verified: true,
      bio: 'Award-winning poet and cultural advocate.',
    },
  ];

  async list() {
    return this.items;
  }

  async create(dto: any) {
    const item = { id: `artist-${Date.now()}`, ...dto, verified: dto.verified ?? false };
    this.items.push(item);
    return item;
  }

  async get(id: string) {
    return this.items.find((item) => item.id === id);
  }
}
