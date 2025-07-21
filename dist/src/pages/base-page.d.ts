import { Logger } from '@utils/logger';
/**
 * Base page class for mobile testing with Appium2
 * Provides common functionality for all page objects
 *
 * This class is universal and can be used with any mobile application
 */
export declare abstract class BasePage {
    protected driver: any;
    protected logger: Logger;
    protected platform: 'android' | 'ios';
    constructor(driver: any, platform: 'android' | 'ios');
    /**
     * Wait for element to be displayed
     */
    waitForElementToBeDisplayed(selector: string, timeout?: number): Promise<void>;
    /**
     * Wait for element to exist
     */
    waitForElementToExist(selector: string, timeout?: number): Promise<void>;
    /**
     * Wait for element to be clickable
     */
    waitForElementToBeClickable(selector: string, timeout?: number): Promise<void>;
    /**
     * Click on element
     */
    clickElement(selector: string, timeout?: number): Promise<void>;
    /**
     * Tap on element (mobile-specific)
     */
    tapElement(selector: string, timeout?: number): Promise<void>;
    /**
     * Long press on element
     */
    longPressElement(selector: string, duration?: number): Promise<void>;
    /**
     * Input text into element
     */
    inputText(selector: string, text: string, clearFirst?: boolean): Promise<void>;
    /**
     * Get text from element
     */
    getElementText(selector: string): Promise<string>;
    /**
     * Check if element is displayed
     */
    isElementDisplayed(selector: string): Promise<boolean>;
    /**
     * Check if element exists
     */
    isElementExists(selector: string): Promise<boolean>;
    /**
     * Check if element is enabled
     */
    isElementEnabled(selector: string): Promise<boolean>;
    /**
     * Check if element is selected (for checkboxes, radio buttons)
     */
    isElementSelected(selector: string): Promise<boolean>;
    /**
     * Get element attribute
     */
    getElementAttribute(selector: string, attributeName: string): Promise<string>;
    /**
     * Scroll to element
     */
    scrollToElement(selector: string): Promise<void>;
    /**
     * Swipe in direction
     */
    swipe(direction: 'up' | 'down' | 'left' | 'right', distance?: number): Promise<void>;
    /**
     * Swipe on specific element
     */
    swipeOnElement(selector: string, direction: 'up' | 'down' | 'left' | 'right'): Promise<void>;
    /**
     * Take screenshot
     */
    takeScreenshot(filename?: string): Promise<string>;
    /**
     * Hide keyboard (mobile-specific)
     */
    hideKeyboard(): Promise<void>;
    /**
     * Get current activity (Android) or current view (iOS)
     */
    getCurrentContext(): Promise<string>;
    /**
     * Wait for a specific time
     */
    wait(milliseconds: number): Promise<void>;
    /**
     * Go back (navigate back)
     */
    goBack(): Promise<void>;
    /**
     * Refresh/reload the current view
     */
    refresh(): Promise<void>;
    /**
     * Get page source for debugging
     */
    getPageSource(): Promise<string>;
    /**
     * Platform-specific selector helper
     */
    protected getSelector(androidSelector: string, iosSelector: string): string;
    /**
     * Wait for app to be in foreground
     */
    waitForAppToBeActive(timeout?: number): Promise<void>;
    /**
     * Send app to background and bring it back
     */
    backgroundApp(duration?: number): Promise<void>;
    /**
     * Get device orientation
     */
    getOrientation(): Promise<string>;
    /**
     * Set device orientation
     */
    setOrientation(orientation: 'PORTRAIT' | 'LANDSCAPE'): Promise<void>;
}
