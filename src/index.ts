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

// Core framework components
export { BasePage } from './pages/base-page';
export { BaseComponent } from './components/base-component';

// Utilities
export { DriverManager } from './utils/driver-manager';
export { Logger } from './utils/logger';

// Test data and fixtures
export { 
  MobileTestDataFactory,
  type UserProfile,
  type DeviceInfo,
  type AppData,
  type LocationData,
  type ContactInfo,
  type CreditCardInfo
} from './fixtures/mobile-test-data-factory';

// Import for default export
import { BasePage } from './pages/base-page';
import { BaseComponent } from './components/base-component';
import { DriverManager } from './utils/driver-manager';
import { Logger } from './utils/logger';
import { MobileTestDataFactory } from './fixtures/mobile-test-data-factory';

// Framework version and metadata
export const FRAMEWORK_VERSION = '1.0.0';
export const FRAMEWORK_NAME = 'Universal Appium2 Framework';

/**
 * Framework capabilities and supported platforms
 */
export const SUPPORTED_PLATFORMS = {
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
} as const;

/**
 * Default configuration for the framework
 */
export const DEFAULT_CONFIG = {
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
} as const;

/**
 * Quick setup helper for new projects
 */
export class FrameworkSetup {
  /**
   * Generate a basic test template for a new mobile app
   */
  static generateTestTemplate(appType: 'android' | 'ios', appName: string): string {
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
  static generateEnvConfig(platform: 'android' | 'ios', appPackage: string, appActivity?: string): string {
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
    } else {
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

// Default export for convenience
export default {
  DriverManager: DriverManager,
  BasePage: BasePage,
  BaseComponent: BaseComponent,
  Logger: Logger,
  MobileTestDataFactory: MobileTestDataFactory,
  FrameworkSetup: FrameworkSetup,
  FRAMEWORK_VERSION,
  FRAMEWORK_NAME,
  SUPPORTED_PLATFORMS,
  DEFAULT_CONFIG
};
