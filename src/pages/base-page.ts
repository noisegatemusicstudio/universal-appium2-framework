import { Browser } from 'webdriverio';
import { Logger } from '@utils/logger';

/**
 * Base page class for mobile testing with Appium2
 * Provides common functionality for all page objects
 * 
 * This class is universal and can be used with any mobile application
 */
export abstract class BasePage {
  protected driver: any;
  protected logger: Logger;
  protected platform: 'android' | 'ios';

  constructor(driver: any, platform: 'android' | 'ios') {
    this.driver = driver;
    this.platform = platform;
    this.logger = new Logger(`BasePage`);
  }

  /**
   * Wait for element to be displayed
   */
  async waitForElementToBeDisplayed(selector: string, timeout: number = 10000): Promise<void> {
    this.logger.info(`Waiting for element to be displayed: ${selector}`);
    const element = await this.driver.$(selector);
    await element.waitForDisplayed({ timeout });
  }

  /**
   * Wait for element to exist
   */
  async waitForElementToExist(selector: string, timeout: number = 10000): Promise<void> {
    this.logger.info(`Waiting for element to exist: ${selector}`);
    const element = await this.driver.$(selector);
    await element.waitForExist({ timeout });
  }

  /**
   * Wait for element to be clickable
   */
  async waitForElementToBeClickable(selector: string, timeout: number = 10000): Promise<void> {
    this.logger.info(`Waiting for element to be clickable: ${selector}`);
    const element = await this.driver.$(selector);
    await element.waitForClickable({ timeout });
  }

  /**
   * Click on element
   */
  async clickElement(selector: string, timeout: number = 10000): Promise<void> {
    this.logger.info(`Clicking element: ${selector}`);
    await this.waitForElementToBeClickable(selector, timeout);
    const element = await this.driver.$(selector);
    await element.click();
  }

  /**
   * Tap on element (mobile-specific)
   */
  async tapElement(selector: string, timeout: number = 10000): Promise<void> {
    this.logger.info(`Tapping element: ${selector}`);
    await this.waitForElementToBeClickable(selector, timeout);
    const element = await this.driver.$(selector);
    await element.click();
  }

  /**
   * Long press on element
   */
  async longPressElement(selector: string, duration: number = 1000): Promise<void> {
    this.logger.info(`Long pressing element: ${selector} for ${duration}ms`);
    const element = await this.driver.$(selector);
    await this.driver.touchAction([
      { action: 'press', element },
      { action: 'wait', ms: duration },
      { action: 'release' }
    ]);
  }

  /**
   * Input text into element
   */
  async inputText(selector: string, text: string, clearFirst: boolean = true): Promise<void> {
    this.logger.info(`Inputting text into ${selector}: ${text.substring(0, 20)}...`);
    const element = await this.driver.$(selector);
    await element.waitForDisplayed();
    
    if (clearFirst) {
      await element.clearValue();
    }
    
    await element.setValue(text);
  }

  /**
   * Get text from element
   */
  async getElementText(selector: string): Promise<string> {
    this.logger.info(`Getting text from element: ${selector}`);
    const element = await this.driver.$(selector);
    await element.waitForDisplayed();
    return await element.getText();
  }

  /**
   * Check if element is displayed
   */
  async isElementDisplayed(selector: string): Promise<boolean> {
    try {
      const element = await this.driver.$(selector);
      return await element.isDisplayed();
    } catch (error) {
      this.logger.debug(`Element not displayed: ${selector}`);
      return false;
    }
  }

  /**
   * Check if element exists
   */
  async isElementExists(selector: string): Promise<boolean> {
    try {
      const element = await this.driver.$(selector);
      return await element.isExisting();
    } catch (error) {
      this.logger.debug(`Element does not exist: ${selector}`);
      return false;
    }
  }

  /**
   * Check if element is enabled
   */
  async isElementEnabled(selector: string): Promise<boolean> {
    const element = await this.driver.$(selector);
    return await element.isEnabled();
  }

  /**
   * Check if element is selected (for checkboxes, radio buttons)
   */
  async isElementSelected(selector: string): Promise<boolean> {
    const element = await this.driver.$(selector);
    return await element.isSelected();
  }

  /**
   * Get element attribute
   */
  async getElementAttribute(selector: string, attributeName: string): Promise<string> {
    const element = await this.driver.$(selector);
    return await element.getAttribute(attributeName);
  }

  /**
   * Scroll to element
   */
  async scrollToElement(selector: string): Promise<void> {
    this.logger.info(`Scrolling to element: ${selector}`);
    const element = await this.driver.$(selector);
    await element.scrollIntoView();
  }

  /**
   * Swipe in direction
   */
  async swipe(direction: 'up' | 'down' | 'left' | 'right', distance?: number): Promise<void> {
    this.logger.info(`Swiping ${direction}`);
    const { width, height } = await this.driver.getWindowSize();
    
    const startX = width / 2;
    const startY = height / 2;
    const swipeDistance = distance || Math.min(width, height) * 0.3;
    
    let endX = startX;
    let endY = startY;
    
    switch (direction) {
      case 'up':
        endY = startY - swipeDistance;
        break;
      case 'down':
        endY = startY + swipeDistance;
        break;
      case 'left':
        endX = startX - swipeDistance;
        break;
      case 'right':
        endX = startX + swipeDistance;
        break;
    }
    
    await this.driver.touchAction([
      { action: 'press', x: startX, y: startY },
      { action: 'wait', ms: 100 },
      { action: 'moveTo', x: endX, y: endY },
      { action: 'release' }
    ]);
  }

  /**
   * Swipe on specific element
   */
  async swipeOnElement(selector: string, direction: 'up' | 'down' | 'left' | 'right'): Promise<void> {
    this.logger.info(`Swiping ${direction} on element: ${selector}`);
    const element = await this.driver.$(selector);
    const location = await element.getLocation();
    const size = await element.getSize();
    
    const centerX = location.x + size.width / 2;
    const centerY = location.y + size.height / 2;
    const swipeDistance = Math.min(size.width, size.height) * 0.8;
    
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

  /**
   * Take screenshot
   */
  async takeScreenshot(filename?: string): Promise<string> {
    const screenshotPath = filename || `screenshot_${Date.now()}.png`;
    this.logger.info(`Taking screenshot: ${screenshotPath}`);
    return await this.driver.saveScreenshot(screenshotPath);
  }

  /**
   * Hide keyboard (mobile-specific)
   */
  async hideKeyboard(): Promise<void> {
    try {
      if (this.platform === 'ios') {
        await this.driver.hideKeyboard('pressKey', 'Done');
      } else {
        await this.driver.hideKeyboard();
      }
      this.logger.info('Keyboard hidden');
    } catch (error) {
      this.logger.debug('No keyboard to hide or error hiding keyboard');
    }
  }

  /**
   * Get current activity (Android) or current view (iOS)
   */
  async getCurrentContext(): Promise<string> {
    if (this.platform === 'android') {
      return await this.driver.getCurrentActivity();
    } else {
      // For iOS, we can get the current bundle ID or window
      const contexts = await this.driver.getContexts();
      return contexts[0] || 'unknown';
    }
  }

  /**
   * Wait for a specific time
   */
  async wait(milliseconds: number): Promise<void> {
    this.logger.info(`Waiting for ${milliseconds}ms`);
    await this.driver.pause(milliseconds);
  }

  /**
   * Go back (navigate back)
   */
  async goBack(): Promise<void> {
    this.logger.info('Navigating back');
    await this.driver.back();
  }

  /**
   * Refresh/reload the current view
   */
  async refresh(): Promise<void> {
    this.logger.info('Refreshing current view');
    if (this.platform === 'android') {
      // Pull to refresh gesture
      await this.swipe('down', 200);
    } else {
      // iOS refresh - implementation depends on app
      await this.swipe('down', 200);
    }
  }

  /**
   * Get page source for debugging
   */
  async getPageSource(): Promise<string> {
    return await this.driver.getPageSource();
  }

  /**
   * Platform-specific selector helper
   */
  protected getSelector(androidSelector: string, iosSelector: string): string {
    return this.platform === 'android' ? androidSelector : iosSelector;
  }

  /**
   * Wait for app to be in foreground
   */
  async waitForAppToBeActive(timeout: number = 10000): Promise<void> {
    this.logger.info('Waiting for app to be active');
    const startTime = Date.now();
    
    while (Date.now() - startTime < timeout) {
      const state = await this.driver.queryAppState(await this.getCurrentContext());
      if (state === 4) { // App is running in foreground
        return;
      }
      await this.wait(500);
    }
    
    throw new Error(`App did not become active within ${timeout}ms`);
  }

  /**
   * Send app to background and bring it back
   */
  async backgroundApp(duration: number = 2000): Promise<void> {
    this.logger.info(`Sending app to background for ${duration}ms`);
    await this.driver.background(duration);
  }

  /**
   * Get device orientation
   */
  async getOrientation(): Promise<string> {
    return await this.driver.getOrientation();
  }

  /**
   * Set device orientation
   */
  async setOrientation(orientation: 'PORTRAIT' | 'LANDSCAPE'): Promise<void> {
    this.logger.info(`Setting orientation to ${orientation}`);
    await this.driver.setOrientation(orientation);
  }
}
