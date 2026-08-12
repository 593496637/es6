module.exports = {
  rootDir: '.',
  testEnvironment: 'node',
  testRegex: '.*\\.spec\\.ts$',
  transform: { '^.+\\.ts$': ['ts-jest', { tsconfig: '../../tsconfig.json' }] },
  moduleDirectories: ['node_modules', '../../node_modules'],
};
