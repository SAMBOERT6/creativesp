import { PrismaClient } from '@prisma/client';

export async function seedDatabase(prisma: PrismaClient) {
  const existingAdmin = await prisma.user.findUnique({ where: { email: 'admin@creativesp.com' } });
  if (!existingAdmin) {
    await prisma.user.create({
      data: {
        name: 'Platform Admin',
        email: 'admin@creativesp.com',
        password: 'password123',
        role: 'SUPER_ADMIN',
      },
    });
  }

  const existingOrganizer = await prisma.user.findUnique({ where: { email: 'organizer@creativesp.com' } });
  if (!existingOrganizer) {
    await prisma.user.create({
      data: {
        name: 'Competition Organizer',
        email: 'organizer@creativesp.com',
        password: 'password123',
        role: 'ORGANIZER',
      },
    });
  }

  const existingCompetition = await prisma.competition.findFirst();
  if (!existingCompetition) {
    const organizer = await prisma.user.findUnique({ where: { email: 'organizer@creativesp.com' } });
    if (organizer) {
      const competition = await prisma.competition.create({
        data: {
          name: 'Poetry of the Future',
          description: 'A flagship competition for emerging poets.',
          category: 'Poetry',
          country: 'South Africa',
          province: 'Western Cape',
          status: 'ACTIVE',
          organizerId: organizer.id,
        },
      });

      await prisma.contestant.createMany({
        data: [
          {
            fullName: 'Ava Moyo',
            bio: 'Emerging poet and spoken word performer.',
            province: 'Western Cape',
            country: 'South Africa',
            competitionId: competition.id,
          },
          {
            fullName: 'Daniel Otieno',
            bio: 'Community storyteller and performance artist.',
            province: 'Nairobi',
            country: 'Kenya',
            competitionId: competition.id,
          },
        ],
      });
    }
  }
}
