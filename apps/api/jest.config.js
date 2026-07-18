module.exports = {
  moduleFileExtensions: ['js', 'ts'],
  rootDir: '.',
  testRegex: '.*\.spec\.ts$',
  transform: {
    '^.+\\.(t|j)s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.json' }],
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
};
