import { remote, Browser } from 'webdriverio';
import { Logger } from './logger';

/**
 * Universal driver manager for Appium2 mobile testing
 * Handles driver initialization for Android and iOS
 */
export class DriverManager {
  private static instance: DriverManager;
  private driver: any | null = null;
  private logger: Logger;
  private platform: 'android' | 'ios';

  private constructor() {
    this.logger = new Logger('DriverManager');
    this.platform = (process.env.PLATFORM as 'android' | 'ios') || 'android';
  }

  static getInstance(): DriverManager {
    if (!DriverManager.instance) {
      DriverManager.instance = new DriverManager();
    }
    return DriverManager.instance;
  }

  /**
   * Initialize driver with platform-specific capabilities
   */
  async initializeDriver(platform?: 'android' | 'ios'): Promise<any> {
    if (platform) {
      this.platform = platform;
    }

    this.logger.info(`Initializing driver for ${this.platform}`);

    const capabilities = this.platform === 'android' 
      ? this.getAndroidCapabilities()
      : this.getIOSCapabilities();

    try {
      this.driver = await remote({
        hostname: process.env.APPIUM_HOST || 'localhost',
        port: parseInt(process.env.APPIUM_PORT || '4723'),
        path: '/',
        capabilities
      });

      this.logger.info(`Driver initialized successfully for ${this.platform}`);
      return this.driver;
    } catch (error) {
      this.logger.error(`Failed to initialize driver for ${this.platform}`, error);
      throw error;
    }
  }

  /**
   * Get current driver instance
   */
  getDriver(): any {
    if (!this.driver) {
      throw new Error('Driver not initialized. Call initializeDriver() first.');
    }
    return this.driver;
  }

  /**
   * Quit driver and cleanup
   */
  async quitDriver(): Promise<void> {
    if (this.driver) {
      this.logger.info('Quitting driver');
      await this.driver.deleteSession();
      this.driver = null;
    }
  }

  /**
   * Get Android capabilities
   */
  private getAndroidCapabilities(): any {
    return {
      platformName: 'Android',
      'appium:platformVersion': process.env.ANDROID_VERSION || '13.0',
      'appium:deviceName': process.env.ANDROID_DEVICE_NAME || 'Android Emulator',
      'appium:udid': process.env.ANDROID_UDID,
      'appium:app': process.env.ANDROID_APP_PATH,
      'appium:appPackage': process.env.ANDROID_APP_PACKAGE,
      'appium:appActivity': process.env.ANDROID_APP_ACTIVITY,
      'appium:automationName': 'UiAutomator2',
      'appium:autoGrantPermissions': true,
      'appium:noReset': process.env.NO_RESET === 'true',
      'appium:fullReset': process.env.FULL_RESET === 'true',
      'appium:newCommandTimeout': 300,
      'appium:androidInstallTimeout': 90000,
      // Performance optimizations
      'appium:skipServerInstallation': true,
      'appium:skipDeviceInitialization': false,
      'appium:skipLogcatCapture': false,
    };
  }

  /**
   * Get iOS capabilities
   */
  private getIOSCapabilities(): any {
    return {
      platformName: 'iOS',
      'appium:platformVersion': process.env.IOS_VERSION || '16.0',
      'appium:deviceName': process.env.IOS_DEVICE_NAME || 'iPhone 14',
      'appium:udid': process.env.IOS_UDID,
      'appium:app': process.env.IOS_APP_PATH,
      'appium:bundleId': process.env.IOS_BUNDLE_ID,
      'appium:automationName': 'XCUITest',
      'appium:autoAcceptAlerts': true,
      'appium:autoDismissAlerts': false,
      'appium:noReset': process.env.NO_RESET === 'true',
      'appium:fullReset': process.env.FULL_RESET === 'true',
      'appium:newCommandTimeout': 300,
      'appium:wdaLaunchTimeout': 60000,
      'appium:wdaConnectionTimeout': 60000,
      // Performance optimizations
      'appium:shouldUseSingletonTestManager': false,
      'appium:shouldUseTestManagerForVisibilityDetection': false,
    };
  }

  /**
   * Reset app
   */
  async resetApp(): Promise<void> {
    if (!this.driver) {
      throw new Error('Driver not initialized');
    }
    
    this.logger.info('Resetting app');
    await this.driver.reset();
  }

  /**
   * Install app
   */
  async installApp(appPath: string): Promise<void> {
    if (!this.driver) {
      throw new Error('Driver not initialized');
    }
    
    this.logger.info(`Installing app: ${appPath}`);
    await this.driver.installApp(appPath);
  }

  /**
   * Remove app
   */
  async removeApp(bundleId: string): Promise<void> {
    if (!this.driver) {
      throw new Error('Driver not initialized');
    }
    
    this.logger.info(`Removing app: ${bundleId}`);
    await this.driver.removeApp(bundleId);
  }

  /**
   * Launch app
   */
  async launchApp(): Promise<void> {
    if (!this.driver) {
      throw new Error('Driver not initialized');
    }
    
    this.logger.info('Launching app');
    await this.driver.launchApp();
  }

  /**
   * Close app
   */
  async closeApp(): Promise<void> {
    if (!this.driver) {
      throw new Error('Driver not initialized');
    }
    
    this.logger.info('Closing app');
    await this.driver.closeApp();
  }

  /**
   * Activate app
   */
  async activateApp(bundleId: string): Promise<void> {
    if (!this.driver) {
      throw new Error('Driver not initialized');
    }
    
    this.logger.info(`Activating app: ${bundleId}`);
    await this.driver.activateApp(bundleId);
  }

  /**
   * Terminate app
   */
  async terminateApp(bundleId: string): Promise<void> {
    if (!this.driver) {
      throw new Error('Driver not initialized');
    }
    
    this.logger.info(`Terminating app: ${bundleId}`);
    await this.driver.terminateApp(bundleId);
  }

  /**
   * Get device time
   */
  async getDeviceTime(): Promise<string> {
    if (!this.driver) {
      throw new Error('Driver not initialized');
    }
    
    return await this.driver.getDeviceTime();
  }

  /**
   * Get platform
   */
  getPlatform(): 'android' | 'ios' {
    return this.platform;
  }
}
