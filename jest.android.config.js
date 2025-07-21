const baseConfig = require('./jest.config');

module.exports = {
  ...baseConfig,
  displayName: 'Android Tests',
  testMatch: [
    '<rootDir>/tests/android/**/*.test.ts',
    '<rootDir>/tests/android/**/*.spec.ts',
    '<rootDir>/tests/shared/**/*.test.ts'
  ],
  setupFilesAfterEnv: [
    '<rootDir>/config/jest.android.setup.ts'
  ],
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json'
    },
    PLATFORM: 'android'
  }
};
