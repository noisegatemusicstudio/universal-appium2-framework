"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverManager = void 0;
const webdriverio_1 = require("webdriverio");
const logger_1 = require("./logger");
/**
 * Universal driver manager for Appium2 mobile testing
 * Handles driver initialization for Android and iOS
 */
class DriverManager {
    constructor() {
        this.driver = null;
        this.logger = new logger_1.Logger('DriverManager');
        this.platform = process.env.PLATFORM || 'android';
    }
    static getInstance() {
        if (!DriverManager.instance) {
            DriverManager.instance = new DriverManager();
        }
        return DriverManager.instance;
    }
    /**
     * Initialize driver with platform-specific capabilities
     */
    async initializeDriver(platform) {
        if (platform) {
            this.platform = platform;
        }
        this.logger.info(`Initializing driver for ${this.platform}`);
        const capabilities = this.platform === 'android'
            ? this.getAndroidCapabilities()
            : this.getIOSCapabilities();
        try {
            this.driver = await (0, webdriverio_1.remote)({
                hostname: process.env.APPIUM_HOST || 'localhost',
                port: parseInt(process.env.APPIUM_PORT || '4723'),
                path: '/',
                capabilities
            });
            this.logger.info(`Driver initialized successfully for ${this.platform}`);
            return this.driver;
        }
        catch (error) {
            this.logger.error(`Failed to initialize driver for ${this.platform}`, error);
            throw error;
        }
    }
    /**
     * Get current driver instance
     */
    getDriver() {
        if (!this.driver) {
            throw new Error('Driver not initialized. Call initializeDriver() first.');
        }
        return this.driver;
    }
    /**
     * Quit driver and cleanup
     */
    async quitDriver() {
        if (this.driver) {
            this.logger.info('Quitting driver');
            await this.driver.deleteSession();
            this.driver = null;
        }
    }
    /**
     * Get Android capabilities
     */
    getAndroidCapabilities() {
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
    getIOSCapabilities() {
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
    async resetApp() {
        if (!this.driver) {
            throw new Error('Driver not initialized');
        }
        this.logger.info('Resetting app');
        await this.driver.reset();
    }
    /**
     * Install app
     */
    async installApp(appPath) {
        if (!this.driver) {
            throw new Error('Driver not initialized');
        }
        this.logger.info(`Installing app: ${appPath}`);
        await this.driver.installApp(appPath);
    }
    /**
     * Remove app
     */
    async removeApp(bundleId) {
        if (!this.driver) {
            throw new Error('Driver not initialized');
        }
        this.logger.info(`Removing app: ${bundleId}`);
        await this.driver.removeApp(bundleId);
    }
    /**
     * Launch app
     */
    async launchApp() {
        if (!this.driver) {
            throw new Error('Driver not initialized');
        }
        this.logger.info('Launching app');
        await this.driver.launchApp();
    }
    /**
     * Close app
     */
    async closeApp() {
        if (!this.driver) {
            throw new Error('Driver not initialized');
        }
        this.logger.info('Closing app');
        await this.driver.closeApp();
    }
    /**
     * Activate app
     */
    async activateApp(bundleId) {
        if (!this.driver) {
            throw new Error('Driver not initialized');
        }
        this.logger.info(`Activating app: ${bundleId}`);
        await this.driver.activateApp(bundleId);
    }
    /**
     * Terminate app
     */
    async terminateApp(bundleId) {
        if (!this.driver) {
            throw new Error('Driver not initialized');
        }
        this.logger.info(`Terminating app: ${bundleId}`);
        await this.driver.terminateApp(bundleId);
    }
    /**
     * Get device time
     */
    async getDeviceTime() {
        if (!this.driver) {
            throw new Error('Driver not initialized');
        }
        return await this.driver.getDeviceTime();
    }
    /**
     * Get platform
     */
    getPlatform() {
        return this.platform;
    }
}
exports.DriverManager = DriverManager;
