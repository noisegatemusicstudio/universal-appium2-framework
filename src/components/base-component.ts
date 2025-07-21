import { Browser } from 'webdriverio';
import { Logger } from '@utils/logger';

/**
 * Base component class for mobile UI elements
 * Provides common functionality for reusable components
 */
export abstract class BaseComponent {
  protected driver: any;
  protected logger: Logger;
  protected platform: 'android' | 'ios';
  protected rootSelector: string;

  constructor(driver: any, platform: 'android' | 'ios', rootSelector: string) {
    this.driver = driver;
    this.platform = platform;
    this.rootSelector = rootSelector;
    this.logger = new Logger(`${this.constructor.name}`);
  }

  /**
   * Wait for component to be visible
   */
  async waitForVisible(timeout: number = 10000): Promise<void> {
    this.logger.info(`Waiting for component to be visible: ${this.rootSelector}`);
    const element = await this.driver.$(this.rootSelector);
    await element.waitForDisplayed({ timeout });
  }

  /**
   * Check if component is visible
   */
  async isVisible(): Promise<boolean> {
    try {
      const element = await this.driver.$(this.rootSelector);
      return await element.isDisplayed();
    } catch (error) {
      return false;
    }
  }

  /**
   * Get platform-specific selector
   */
  protected getSelector(androidSelector: string, iosSelector: string): string {
    return this.platform === 'android' ? androidSelector : iosSelector;
  }

  /**
   * Find element within component
   */
  protected async findElement(selector: string): Promise<WebdriverIO.Element> {
    const rootElement = await this.driver.$(this.rootSelector);
    return await rootElement.$(selector);
  }

  /**
   * Find multiple elements within component
   */
  protected async findElements(selector: string): Promise<WebdriverIO.Element[]> {
    const rootElement = await this.driver.$(this.rootSelector);
    return await rootElement.$$(selector);
  }

  /**
   * Click element within component
   */
  protected async clickElement(selector: string): Promise<void> {
    this.logger.action(`Clicking element in component: ${selector}`);
    const element = await this.findElement(selector);
    await element.click();
  }

  /**
   * Input text into element within component
   */
  protected async inputText(selector: string, text: string, clearFirst: boolean = true): Promise<void> {
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
  protected async getText(selector: string): Promise<string> {
    const element = await this.findElement(selector);
    return await element.getText();
  }

  /**
   * Swipe within component
   */
  protected async swipeInComponent(direction: 'up' | 'down' | 'left' | 'right'): Promise<void> {
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
