import { Injectable } from '@nestjs/common';

@Injectable()
export class NewslettersService {
  private subscribers = [
    { id: 'sub-1', email: 'reader@creativesp.com', name: 'Creative Reader' },
  ];

  async list() {
    return this.subscribers;
  }

  async subscribe(dto: { email: string; name?: string }) {
    const subscriber = {
      id: `sub-${Date.now()}`,
      email: dto.email,
      name: dto.name ?? 'Anonymous',
    };
    this.subscribers.push(subscriber);
    return subscriber;
  }
}
