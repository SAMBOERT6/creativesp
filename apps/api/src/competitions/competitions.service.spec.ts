import { CompetitionsService } from './competitions.service';

describe('CompetitionsService', () => {
  it('creates a competition with draft status', async () => {
    const service = new CompetitionsService();
    const created = await service.create({
      name: 'Summer Voices',
      category: 'Music',
      country: 'South Africa',
      organizerId: 'organizer-1',
    });

    expect(created.status).toBe('DRAFT');
    expect(created.name).toBe('Summer Voices');
  });
});
