// Jest setup file for Appium2 Framework
// This file runs before each test to set up the testing environment

import { Logger } from './src/utils/logger';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Global logger for Jest setup
const logger = new Logger('JestSetup');

// Set up global test timeout
jest.setTimeout(120000); // 2 minutes

// Global setup for all tests
beforeAll(async () => {
  logger.info('🚀 Starting Appium2 Framework test suite');
  logger.info('Environment loaded', {
    nodeEnv: process.env.NODE_ENV,
    platform: process.platform,
    appiumHost: process.env.APPIUM_HOST || '127.0.0.1',
    appiumPort: process.env.APPIUM_PORT || '4723'
  });
});

// Global cleanup after all tests
afterAll(async () => {
  logger.info('✅ Appium2 Framework test suite completed');
});

// Global error handling
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
});

// Extend Jest matchers for better mobile testing assertions
expect.extend({
  // Custom matcher for element visibility
  toBeVisibleOnScreen(received) {
    const pass = received && received.isDisplayed && received.isDisplayed();
    if (pass) {
      return {
        message: () => `expected element not to be visible on screen`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected element to be visible on screen`,
        pass: false,
      };
    }
  },

  // Custom matcher for element clickability
  toBeClickableOnDevice(received) {
    const pass = received && received.isEnabled && received.isEnabled();
    if (pass) {
      return {
        message: () => `expected element not to be clickable on device`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected element to be clickable on device`,
        pass: false,
      };
    }
  },

  // Custom matcher for text content
  toContainTextOnDevice(received, expected) {
    const actualText = received && received.getText ? received.getText() : '';
    const pass = actualText.includes(expected);
    if (pass) {
      return {
        message: () => `expected "${actualText}" not to contain "${expected}"`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected "${actualText}" to contain "${expected}"`,
        pass: false,
      };
    }
  }
});

// Global test configuration
global.testConfig = {
  defaultTimeout: parseInt(process.env.DEFAULT_WAIT_TIMEOUT || '10000'),
  elementTimeout: parseInt(process.env.ELEMENT_WAIT_TIMEOUT || '15000'),
  pageLoadTimeout: parseInt(process.env.PAGE_LOAD_TIMEOUT || '30000'),
  captureScreenshots: process.env.CAPTURE_SCREENSHOTS === 'true',
  screenshotsDir: process.env.SCREENSHOTS_DIR || './test-results/screenshots',
  logLevel: process.env.LOG_LEVEL || 'info'
};

// Console overrides for better test output
const originalConsoleLog = console.log;
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

console.log = (...args) => {
  if (process.env.NODE_ENV !== 'test' || process.env.VERBOSE_LOGS === 'true') {
    originalConsoleLog(...args);
  }
};

console.error = (...args) => {
  originalConsoleError(...args);
};

console.warn = (...args) => {
  if (process.env.NODE_ENV !== 'test' || process.env.VERBOSE_LOGS === 'true') {
    originalConsoleWarn(...args);
  }
};

logger.info('Jest setup completed successfully');
