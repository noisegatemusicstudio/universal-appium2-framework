"use strict";
/**
 * Universal Appium2 Mobile Testing Framework
 *
 * A production-ready, plug-and-play mobile testing framework for Android and iOS applications.
 * Built with Appium2, WebDriverIO, TypeScript, and Jest.
 *
 * Features:
 * - Cross-platform mobile testing (Android & iOS)
 * - Page Object Model with mobile-specific patterns
 * - Comprehensive touch gesture support
 * - Advanced test data generation
 * - Professional logging and reporting
 * - Git submodule ready for any project
 *
 * @example
 * ```typescript
 * import { DriverManager, BasePage, MobileTestDataFactory } from '@universal/appium2-framework';
 *
 * // Initialize driver
 * const driver = await DriverManager.getInstance().initializeDriver('android');
 *
 * // Create page object
 * class LoginPage extends BasePage {
 *   async login(email: string, password: string) {
 *     await this.inputText('#email', email);
 *     await this.inputText('#password', password);
 *     await this.clickElement('#login-button');
 *   }
 * }
 *
 * // Generate test data
 * const user = MobileTestDataFactory.generateUser('premium');
 *
 * // Use in test
 * const loginPage = new LoginPage(driver, 'android');
 * await loginPage.login(user.email, user.password);
 * ```
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrameworkSetup = exports.DEFAULT_CONFIG = exports.SUPPORTED_PLATFORMS = exports.FRAMEWORK_NAME = exports.FRAMEWORK_VERSION = exports.MobileTestDataFactory = exports.Logger = exports.DriverManager = exports.BaseComponent = exports.BasePage = void 0;
// Core framework components
var base_page_1 = require("./pages/base-page");
Object.defineProperty(exports, "BasePage", { enumerable: true, get: function () { return base_page_1.BasePage; } });
var base_component_1 = require("./components/base-component");
Object.defineProperty(exports, "BaseComponent", { enumerable: true, get: function () { return base_component_1.BaseComponent; } });
// Utilities
var driver_manager_1 = require("./utils/driver-manager");
Object.defineProperty(exports, "DriverManager", { enumerable: true, get: function () { return driver_manager_1.DriverManager; } });
var logger_1 = require("./utils/logger");
Object.defineProperty(exports, "Logger", { enumerable: true, get: function () { return logger_1.Logger; } });
// Test data and fixtures
var mobile_test_data_factory_1 = require("./fixtures/mobile-test-data-factory");
Object.defineProperty(exports, "MobileTestDataFactory", { enumerable: true, get: function () { return mobile_test_data_factory_1.MobileTestDataFactory; } });
// Import for default export
const base_page_2 = require("./pages/base-page");
const base_component_2 = require("./components/base-component");
const driver_manager_2 = require("./utils/driver-manager");
const logger_2 = require("./utils/logger");
const mobile_test_data_factory_2 = require("./fixtures/mobile-test-data-factory");
// Framework version and metadata
exports.FRAMEWORK_VERSION = '1.0.0';
exports.FRAMEWORK_NAME = 'Universal Appium2 Framework';
/**
 * Framework capabilities and supported platforms
 */
exports.SUPPORTED_PLATFORMS = {
    android: {
        automationName: 'UiAutomator2',
        minVersion: '5.0',
        maxVersion: '14.0',
        capabilities: ['touch', 'gestures', 'device_control', 'app_management']
    },
    ios: {
        automationName: 'XCUITest',
        minVersion: '12.0',
        maxVersion: '17.0',
        capabilities: ['touch', 'gestures', 'device_control', 'app_management', 'accessibility']
    }
};
/**
 * Default configuration for the framework
 */
exports.DEFAULT_CONFIG = {
    timeouts: {
        implicit: 10000,
        explicit: 15000,
        page_load: 30000
    },
    appium: {
        host: '127.0.0.1',
        port: 4723,
        logLevel: 'info'
    },
    test: {
        retries: 2,
        parallel: false, // Mobile tests should run sequentially
        screenshots: true,
        videos: false
    }
};
/**
 * Quick setup helper for new projects
 */
class FrameworkSetup {
    /**
     * Generate a basic test template for a new mobile app
     */
    static generateTestTemplate(appType, appName) {
        return `
import { DriverManager, BasePage, MobileTestDataFactory, Logger } from '@universal/appium2-framework';

class ${appName}Page extends BasePage {
  // Add your app-specific selectors here
  private get welcomeText() {
    return this.getSelector(
      'android=new UiSelector().text("Welcome")', // Android selector
      'id:welcomeLabel' // iOS selector
    );
  }

  async getWelcomeMessage(): Promise<string> {
    const element = await this.driver.$(this.welcomeText);
    await element.waitForDisplayed({ timeout: 10000 });
    return await element.getText();
  }
}

describe('${appName} Tests', () => {
  let driver: any;
  let ${appName.toLowerCase()}Page: ${appName}Page;
  const logger = new Logger('${appName}Tests');

  beforeAll(async () => {
    driver = await DriverManager.getInstance().initializeDriver('${appType}');
    ${appName.toLowerCase()}Page = new ${appName}Page(driver, '${appType}');
  }, 60000);

  afterAll(async () => {
    await DriverManager.getInstance().quitDriver();
  });

  test('should display welcome message', async () => {
    const welcomeMessage = await ${appName.toLowerCase()}Page.getWelcomeMessage();
    expect(welcomeMessage).toContain('Welcome');
  });
});
`;
    }
    /**
     * Generate environment configuration for a new project
     */
    static generateEnvConfig(platform, appPackage, appActivity) {
        if (platform === 'android') {
            return `
# Android Configuration
ANDROID_APP_PACKAGE=${appPackage}
ANDROID_APP_ACTIVITY=${appActivity || '.MainActivity'}
ANDROID_DEVICE_NAME=Android_Emulator
ANDROID_PLATFORM_VERSION=13.0

# Appium Configuration  
APPIUM_HOST=127.0.0.1
APPIUM_PORT=4723
`;
        }
        else {
            return `
# iOS Configuration
IOS_BUNDLE_ID=${appPackage}
IOS_DEVICE_NAME=iPhone 14 Pro
IOS_PLATFORM_VERSION=16.0

# Appium Configuration
APPIUM_HOST=127.0.0.1
APPIUM_PORT=4723
`;
        }
    }
}
exports.FrameworkSetup = FrameworkSetup;
// Default export for convenience
exports.default = {
    DriverManager: driver_manager_2.DriverManager,
    BasePage: base_page_2.BasePage,
    BaseComponent: base_component_2.BaseComponent,
    Logger: logger_2.Logger,
    MobileTestDataFactory: mobile_test_data_factory_2.MobileTestDataFactory,
    FrameworkSetup: FrameworkSetup,
    FRAMEWORK_VERSION: exports.FRAMEWORK_VERSION,
    FRAMEWORK_NAME: exports.FRAMEWORK_NAME,
    SUPPORTED_PLATFORMS: exports.SUPPORTED_PLATFORMS,
    DEFAULT_CONFIG: exports.DEFAULT_CONFIG
};
