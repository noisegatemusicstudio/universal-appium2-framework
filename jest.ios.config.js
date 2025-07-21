const baseConfig = require('./jest.config');

module.exports = {
  ...baseConfig,
  displayName: 'iOS Tests',
  testMatch: [
    '<rootDir>/tests/ios/**/*.test.ts',
    '<rootDir>/tests/ios/**/*.spec.ts',
    '<rootDir>/tests/shared/**/*.test.ts'
  ],
  setupFilesAfterEnv: [
    '<rootDir>/config/jest.ios.setup.ts'
  ],
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json'
    },
    PLATFORM: 'ios'
  }
};
