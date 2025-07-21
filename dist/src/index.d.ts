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
export { BasePage } from './pages/base-page';
export { BaseComponent } from './components/base-component';
export { DriverManager } from './utils/driver-manager';
export { Logger } from './utils/logger';
export { MobileTestDataFactory, type UserProfile, type DeviceInfo, type AppData, type LocationData, type ContactInfo, type CreditCardInfo } from './fixtures/mobile-test-data-factory';
import { BasePage } from './pages/base-page';
import { BaseComponent } from './components/base-component';
import { DriverManager } from './utils/driver-manager';
import { Logger } from './utils/logger';
import { MobileTestDataFactory } from './fixtures/mobile-test-data-factory';
export declare const FRAMEWORK_VERSION = "1.0.0";
export declare const FRAMEWORK_NAME = "Universal Appium2 Framework";
/**
 * Framework capabilities and supported platforms
 */
export declare const SUPPORTED_PLATFORMS: {
    readonly android: {
        readonly automationName: "UiAutomator2";
        readonly minVersion: "5.0";
        readonly maxVersion: "14.0";
        readonly capabilities: readonly ["touch", "gestures", "device_control", "app_management"];
    };
    readonly ios: {
        readonly automationName: "XCUITest";
        readonly minVersion: "12.0";
        readonly maxVersion: "17.0";
        readonly capabilities: readonly ["touch", "gestures", "device_control", "app_management", "accessibility"];
    };
};
/**
 * Default configuration for the framework
 */
export declare const DEFAULT_CONFIG: {
    readonly timeouts: {
        readonly implicit: 10000;
        readonly explicit: 15000;
        readonly page_load: 30000;
    };
    readonly appium: {
        readonly host: "127.0.0.1";
        readonly port: 4723;
        readonly logLevel: "info";
    };
    readonly test: {
        readonly retries: 2;
        readonly parallel: false;
        readonly screenshots: true;
        readonly videos: false;
    };
};
/**
 * Quick setup helper for new projects
 */
export declare class FrameworkSetup {
    /**
     * Generate a basic test template for a new mobile app
     */
    static generateTestTemplate(appType: 'android' | 'ios', appName: string): string;
    /**
     * Generate environment configuration for a new project
     */
    static generateEnvConfig(platform: 'android' | 'ios', appPackage: string, appActivity?: string): string;
}
declare const _default: {
    DriverManager: typeof DriverManager;
    BasePage: typeof BasePage;
    BaseComponent: typeof BaseComponent;
    Logger: typeof Logger;
    MobileTestDataFactory: typeof MobileTestDataFactory;
    FrameworkSetup: typeof FrameworkSetup;
    FRAMEWORK_VERSION: string;
    FRAMEWORK_NAME: string;
    SUPPORTED_PLATFORMS: {
        readonly android: {
            readonly automationName: "UiAutomator2";
            readonly minVersion: "5.0";
            readonly maxVersion: "14.0";
            readonly capabilities: readonly ["touch", "gestures", "device_control", "app_management"];
        };
        readonly ios: {
            readonly automationName: "XCUITest";
            readonly minVersion: "12.0";
            readonly maxVersion: "17.0";
            readonly capabilities: readonly ["touch", "gestures", "device_control", "app_management", "accessibility"];
        };
    };
    DEFAULT_CONFIG: {
        readonly timeouts: {
            readonly implicit: 10000;
            readonly explicit: 15000;
            readonly page_load: 30000;
        };
        readonly appium: {
            readonly host: "127.0.0.1";
            readonly port: 4723;
            readonly logLevel: "info";
        };
        readonly test: {
            readonly retries: 2;
            readonly parallel: false;
            readonly screenshots: true;
            readonly videos: false;
        };
    };
};
export default _default;
