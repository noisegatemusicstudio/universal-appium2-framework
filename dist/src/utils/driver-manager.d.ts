/**
 * Universal driver manager for Appium2 mobile testing
 * Handles driver initialization for Android and iOS
 */
export declare class DriverManager {
    private static instance;
    private driver;
    private logger;
    private platform;
    private constructor();
    static getInstance(): DriverManager;
    /**
     * Initialize driver with platform-specific capabilities
     */
    initializeDriver(platform?: 'android' | 'ios'): Promise<any>;
    /**
     * Get current driver instance
     */
    getDriver(): any;
    /**
     * Quit driver and cleanup
     */
    quitDriver(): Promise<void>;
    /**
     * Get Android capabilities
     */
    private getAndroidCapabilities;
    /**
     * Get iOS capabilities
     */
    private getIOSCapabilities;
    /**
     * Reset app
     */
    resetApp(): Promise<void>;
    /**
     * Install app
     */
    installApp(appPath: string): Promise<void>;
    /**
     * Remove app
     */
    removeApp(bundleId: string): Promise<void>;
    /**
     * Launch app
     */
    launchApp(): Promise<void>;
    /**
     * Close app
     */
    closeApp(): Promise<void>;
    /**
     * Activate app
     */
    activateApp(bundleId: string): Promise<void>;
    /**
     * Terminate app
     */
    terminateApp(bundleId: string): Promise<void>;
    /**
     * Get device time
     */
    getDeviceTime(): Promise<string>;
    /**
     * Get platform
     */
    getPlatform(): 'android' | 'ios';
}
