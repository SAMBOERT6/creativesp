export const seedData = {
  competitions: [
    {
      id: 'cmp-1001',
      name: 'Poetry of the Future',
      category: 'Poetry',
      country: 'South Africa',
      province: 'Western Cape',
      status: 'ACTIVE',
    },
    {
      id: 'cmp-1002',
      name: 'Bright Futures Talent',
      category: 'Talent Shows',
      country: 'Kenya',
      province: 'Nairobi',
      status: 'ACTIVE',
    },
  ],
  contestants: [
    {
      id: 'cnt-1001',
      fullName: 'Ava Moyo',
      competitionId: 'cmp-1001',
      country: 'South Africa',
    },
    {
      id: 'cnt-1002',
      fullName: 'Daniel Otieno',
      competitionId: 'cmp-1002',
      country: 'Kenya',
    },
  ],
};
