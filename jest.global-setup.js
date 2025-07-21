// Global setup for Jest - runs once before all tests
// This file handles test environment initialization

const { Logger } = require('./src/utils/logger');
const fs = require('fs');
const path = require('path');

const logger = new Logger('GlobalSetup');

module.exports = async () => {
  logger.info('🔧 Setting up global test environment');

  try {
    // Create necessary directories
    const directories = [
      'test-results',
      'test-results/screenshots',
      'test-results/reports',
      'test-results/videos',
      'test-results/coverage',
      'logs'
    ];

    directories.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        logger.info(`Created directory: ${dir}`);
      }
    });

    // Set global environment variables for tests
    process.env.TEST_ENVIRONMENT = 'jest';
    process.env.TEST_START_TIME = new Date().toISOString();

    // Log environment information
    logger.info('Test environment configured', {
      nodeVersion: process.version,
      platform: process.platform,
      architecture: process.arch,
      testEnvironment: process.env.TEST_ENVIRONMENT,
      startTime: process.env.TEST_START_TIME
    });

    // Check if Appium server is running (optional)
    if (process.env.CHECK_APPIUM_SERVER === 'true') {
      try {
        const fetch = require('node-fetch');
        const appiumHost = process.env.APPIUM_HOST || '127.0.0.1';
        const appiumPort = process.env.APPIUM_PORT || '4723';
        
        const response = await fetch(`http://${appiumHost}:${appiumPort}/status`, {
          timeout: 5000
        });
        
        if (response.ok) {
          logger.info('✅ Appium server is running');
        } else {
          logger.warn('⚠️ Appium server check failed');
        }
      } catch (error) {
        logger.warn('⚠️ Could not connect to Appium server - tests may fail');
      }
    }

    logger.info('✅ Global setup completed successfully');

  } catch (error) {
    logger.error('❌ Global setup failed:', error);
    throw error;
  }
};
