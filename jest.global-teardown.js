// Global teardown for Jest - runs once after all tests
// This file handles test environment cleanup

const { Logger } = require('./src/utils/logger');
const fs = require('fs');
const path = require('path');

const logger = new Logger('GlobalTeardown');

module.exports = async () => {
  logger.info('🧹 Starting global test cleanup');

  try {
    // Calculate test duration
    const startTime = process.env.TEST_START_TIME;
    const endTime = new Date().toISOString();
    const duration = startTime ? 
      (new Date(endTime).getTime() - new Date(startTime).getTime()) / 1000 : 
      'unknown';

    logger.info('Test suite completed', {
      startTime,
      endTime,
      duration: `${duration}s`
    });

    // Generate test summary
    const summaryPath = path.join('test-results', 'test-summary.json');
    const summary = {
      testRun: {
        startTime,
        endTime,
        duration: `${duration}s`,
        environment: {
          nodeVersion: process.version,
          platform: process.platform,
          architecture: process.arch
        }
      },
      framework: {
        name: 'Appium2 Universal Framework',
        version: '1.0.0',
        description: 'Universal mobile testing framework for Android and iOS'
      }
    };

    fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
    logger.info(`Test summary written to: ${summaryPath}`);

    // Clean up temporary files if needed
    const tempFiles = [
      '.appium.pid',
      'temp-screenshots',
      'temp-logs'
    ];

    tempFiles.forEach(file => {
      if (fs.existsSync(file)) {
        try {
          if (fs.statSync(file).isDirectory()) {
            fs.rmSync(file, { recursive: true, force: true });
          } else {
            fs.unlinkSync(file);
          }
          logger.info(`Cleaned up temporary file/directory: ${file}`);
        } catch (error) {
          logger.warn(`Could not clean up ${file}:`, error.message);
        }
      }
    });

    // Log final statistics
    const resultsDir = 'test-results';
    if (fs.existsSync(resultsDir)) {
      const files = fs.readdirSync(resultsDir);
      logger.info(`Test artifacts generated: ${files.length} files in ${resultsDir}/`);
    }

    logger.info('✅ Global teardown completed successfully');

  } catch (error) {
    logger.error('❌ Global teardown failed:', error);
    // Don't throw here to avoid masking test failures
  }
};
