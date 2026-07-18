import { Injectable } from '@nestjs/common';

@Injectable()
export class OpportunitiesService {
  private items = [
    {
      id: 'opp-1',
      title: 'Creative Arts Grant Fund 2026',
      category: 'Grant',
      country: 'South Africa',
      province: 'Western Cape',
      deadline: '2026-10-31',
      description: 'Funding for emerging artists and cultural projects.',
    },
    {
      id: 'opp-2',
      title: 'Open Call for Poetry Residencies',
      category: 'Residency',
      country: 'Kenya',
      province: 'Nairobi',
      deadline: '2026-09-15',
      description: 'A residency program for poets and literary creators.',
    },
  ];

  async list() {
    return this.items;
  }

  async create(dto: any) {
    const item = { id: `opp-${Date.now()}`, ...dto };
    this.items.push(item);
    return item;
  }

  async get(id: string) {
    return this.items.find((item) => item.id === id);
  }
}
