/** @type {import('jest').Config} */
module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    'modules/**/*.service.ts',
    'common/filters/**/*.ts',
    'common/guards/**/*.ts',
    'common/interceptors/**/*.ts',
    'common/middleware/**/*.ts',
    '!**/*.spec.ts',
  ],
  coverageThreshold: {
    global: {
      statements: 75,
      branches: 60,
      functions: 75,
      lines: 75,
    },
  },
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};
