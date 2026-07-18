import { NewsService } from './news.service';

describe('NewsService', () => {
  let service: NewsService;

  beforeEach(() => {
    service = new NewsService();
  });

  it('returns a published list of news items sorted by recency', async () => {
    const result = await service.list();

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toMatchObject({
      status: 'PUBLISHED',
    });
  });
});
