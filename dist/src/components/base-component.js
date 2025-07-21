"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseComponent = void 0;
const logger_1 = require("@utils/logger");
/**
 * Base component class for mobile UI elements
 * Provides common functionality for reusable components
 */
class BaseComponent {
    constructor(driver, platform, rootSelector) {
        this.driver = driver;
        this.platform = platform;
        this.rootSelector = rootSelector;
        this.logger = new logger_1.Logger(`${this.constructor.name}`);
    }
    /**
     * Wait for component to be visible
     */
    async waitForVisible(timeout = 10000) {
        this.logger.info(`Waiting for component to be visible: ${this.rootSelector}`);
        const element = await this.driver.$(this.rootSelector);
        await element.waitForDisplayed({ timeout });
    }
    /**
     * Check if component is visible
     */
    async isVisible() {
        try {
            const element = await this.driver.$(this.rootSelector);
            return await element.isDisplayed();
        }
        catch (error) {
            return false;
        }
    }
    /**
     * Get platform-specific selector
     */
    getSelector(androidSelector, iosSelector) {
        return this.platform === 'android' ? androidSelector : iosSelector;
    }
    /**
     * Find element within component
     */
    async findElement(selector) {
        const rootElement = await this.driver.$(this.rootSelector);
        return await rootElement.$(selector);
    }
    /**
     * Find multiple elements within component
     */
    async findElements(selector) {
        const rootElement = await this.driver.$(this.rootSelector);
        return await rootElement.$$(selector);
    }
    /**
     * Click element within component
     */
    async clickElement(selector) {
        this.logger.action(`Clicking element in component: ${selector}`);
        const element = await this.findElement(selector);
        await element.click();
    }
    /**
     * Input text into element within component
     */
    async inputText(selector, text, clearFirst = true) {
        this.logger.action(`Inputting text into component element: ${selector}`);
        const element = await this.findElement(selector);
        if (clearFirst) {
            await element.clearValue();
        }
        await element.setValue(text);
    }
    /**
     * Get text from element within component
     */
    async getText(selector) {
        const element = await this.findElement(selector);
        return await element.getText();
    }
    /**
     * Swipe within component
     */
    async swipeInComponent(direction) {
        this.logger.action(`Swiping ${direction} in component`);
        const element = await this.driver.$(this.rootSelector);
        const location = await element.getLocation();
        const size = await element.getSize();
        const centerX = location.x + size.width / 2;
        const centerY = location.y + size.height / 2;
        const swipeDistance = Math.min(size.width, size.height) * 0.5;
        let endX = centerX;
        let endY = centerY;
        switch (direction) {
            case 'up':
                endY = centerY - swipeDistance;
                break;
            case 'down':
                endY = centerY + swipeDistance;
                break;
            case 'left':
                endX = centerX - swipeDistance;
                break;
            case 'right':
                endX = centerX + swipeDistance;
                break;
        }
        await this.driver.touchAction([
            { action: 'press', x: centerX, y: centerY },
            { action: 'wait', ms: 100 },
            { action: 'moveTo', x: endX, y: endY },
            { action: 'release' }
        ]);
    }
}
exports.BaseComponent = BaseComponent;
