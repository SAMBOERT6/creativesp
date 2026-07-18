import { AuthService } from './auth.service';

describe('AuthService', () => {
  it('returns a token for valid credentials', async () => {
    const service = new AuthService();
    const result = await service.signIn('admin@creativesp.com', 'password123');

    expect(result.accessToken).toBeDefined();
    expect(result.user.role).toBe('SUPER_ADMIN');
  });

  it('rejects invalid credentials', async () => {
    const service = new AuthService();

    await expect(service.signIn('bad@example.com', 'wrong')).rejects.toThrow('Invalid credentials');
  });
});
