import { Logger } from '@utils/logger';
/**
 * Base component class for mobile UI elements
 * Provides common functionality for reusable components
 */
export declare abstract class BaseComponent {
    protected driver: any;
    protected logger: Logger;
    protected platform: 'android' | 'ios';
    protected rootSelector: string;
    constructor(driver: any, platform: 'android' | 'ios', rootSelector: string);
    /**
     * Wait for component to be visible
     */
    waitForVisible(timeout?: number): Promise<void>;
    /**
     * Check if component is visible
     */
    isVisible(): Promise<boolean>;
    /**
     * Get platform-specific selector
     */
    protected getSelector(androidSelector: string, iosSelector: string): string;
    /**
     * Find element within component
     */
    protected findElement(selector: string): Promise<WebdriverIO.Element>;
    /**
     * Find multiple elements within component
     */
    protected findElements(selector: string): Promise<WebdriverIO.Element[]>;
    /**
     * Click element within component
     */
    protected clickElement(selector: string): Promise<void>;
    /**
     * Input text into element within component
     */
    protected inputText(selector: string, text: string, clearFirst?: boolean): Promise<void>;
    /**
     * Get text from element within component
     */
    protected getText(selector: string): Promise<string>;
    /**
     * Swipe within component
     */
    protected swipeInComponent(direction: 'up' | 'down' | 'left' | 'right'): Promise<void>;
}
