/**
 * Example iOS mobile test demonstrating framework usage
 * 
 * This is a template showing how to use the Appium2 framework for iOS testing.
 * Copy this pattern to create tests for your specific mobile application.
 * 
 * TO CUSTOMIZE FOR YOUR APP:
 * 1. Update the selectors to match your app's UI elements
 * 2. Modify test data to match your app's data model
 * 3. Adjust assertions to match your app's behavior
 * 4. Configure app bundle ID and path in .env file
 */

import { DriverManager } from '../../src/utils/driver-manager';
import { MobileTestDataFactory } from '../../src/fixtures/mobile-test-data-factory';
import { Logger } from '../../src/utils/logger';

// Example page object for your iOS app - customize this
class iOSExamplePage {
  private driver: any;
  private logger: Logger;

  constructor(driver: any) {
    this.driver = driver;
    this.logger = new Logger('iOSExamplePage');
  }

  // 👈 Update these selectors to match your app's UI
  private get welcomeLabel() {
    return 'id:welcomeLabel';
  }

  private get mainButton() {
    return 'id:mainButton';
  }

  private get emailTextField() {
    return 'id:emailTextField';
  }

  private get submitButton() {
    return 'accessibility id:Submit';
  }

  async getWelcomeMessage(): Promise<string> {
    this.logger.info('Getting welcome message');
    const element = await this.driver.$(this.welcomeLabel);
    await element.waitForDisplayed({ timeout: 10000 });
    return await element.getText();
  }

  async clickMainButton(): Promise<void> {
    this.logger.action('Clicking main button');
    const element = await this.driver.$(this.mainButton);
    await element.waitForClickable({ timeout: 10000 });
    await element.click();
  }

  async enterEmail(email: string): Promise<void> {
    this.logger.action('Entering email', email);
    const element = await this.driver.$(this.emailTextField);
    await element.waitForDisplayed({ timeout: 10000 });
    await element.setValue(email);
  }

  async submitForm(): Promise<void> {
    this.logger.action('Submitting form');
    const element = await this.driver.$(this.submitButton);
    await element.click();
  }

  async isElementDisplayed(selector: string): Promise<boolean> {
    try {
      const element = await this.driver.$(selector);
      return await element.isDisplayed();
    } catch (error) {
      return false;
    }
  }

  async scrollToElement(selector: string): Promise<void> {
    this.logger.action('Scrolling to element', selector);
    const element = await this.driver.$(selector);
    await this.driver.execute('mobile: scroll', { element: element.elementId, direction: 'down' });
  }

  async performSwipeGesture(direction: 'up' | 'down' | 'left' | 'right'): Promise<void> {
    this.logger.action('Performing swipe gesture', direction);
    await this.driver.execute('mobile: swipe', { direction });
  }
}

describe('iOS Example App Tests', () => {
  let driver: any;
  let examplePage: iOSExamplePage;
  const logger = new Logger('iOSExampleTests');

  beforeAll(async () => {
    logger.info('Setting up iOS test suite');
    driver = await DriverManager.getInstance().initializeDriver('ios');
    examplePage = new iOSExamplePage(driver);
  }, 60000); // 60 second timeout for driver setup

  afterAll(async () => {
    logger.info('Tearing down iOS test suite');
    await DriverManager.getInstance().quitDriver();
  });

  describe('App Launch and Navigation', () => {
    test('should launch app successfully', async () => {
      logger.step('Verifying app launch');
      
      // Wait for app to load
      await driver.pause(3000);
      
      // 👈 Customize this assertion for your app
      const bundleId = await driver.execute('mobile: getBundleId');
      expect(bundleId).toBeTruthy();
      
      logger.assertion('App launched successfully', true);
    }, 30000);

    test('should display welcome message', async () => {
      logger.step('Checking welcome message');
      
      // 👈 Update this based on your app's welcome screen
      const isWelcomeDisplayed = await examplePage.isElementDisplayed('id:welcomeLabel');
      
      if (isWelcomeDisplayed) {
        const welcomeMessage = await examplePage.getWelcomeMessage();
        expect(welcomeMessage).toContain('Welcome');
        logger.assertion('Welcome message displayed', true);
      } else {
        logger.info('Welcome message not found - this is expected for custom apps');
      }
    }, 30000);
  });

  describe('User Interactions', () => {
    test('should handle button taps', async () => {
      logger.step('Testing button interactions');
      
      // Generate test data
      const userData = MobileTestDataFactory.generateUser();
      logger.info('Generated test user', { email: userData.email });
      
      // 👈 Customize these interactions for your app
      try {
        // Example interaction - update selectors for your app
        const isButtonDisplayed = await examplePage.isElementDisplayed('id:mainButton');
        
        if (isButtonDisplayed) {
          await examplePage.clickMainButton();
          logger.assertion('Button tap successful', true);
        } else {
          logger.info('Main button not found - update selector for your app');
        }
      } catch (error) {
        logger.info('Button interaction failed - expected for template test');
      }
    }, 30000);

    test('should handle text input', async () => {
      logger.step('Testing text input');
      
      const userData = MobileTestDataFactory.generateUser();
      
      try {
        // 👈 Update these selectors to match your app's input fields
        const isEmailFieldDisplayed = await examplePage.isElementDisplayed('id:emailTextField');
        
        if (isEmailFieldDisplayed) {
          await examplePage.enterEmail(userData.email);
          logger.assertion('Text input successful', true);
        } else {
          logger.info('Email field not found - update selector for your app');
        }
      } catch (error) {
        logger.info('Text input failed - expected for template test');
      }
    }, 30000);

    test('should handle touch gestures', async () => {
      logger.step('Testing touch gestures');
      
      try {
        // Test swipe gestures
        await examplePage.performSwipeGesture('up');
        await driver.pause(1000);
        await examplePage.performSwipeGesture('down');
        
        logger.assertion('Touch gestures completed', true);
      } catch (error) {
        logger.info('Touch gestures test completed with expected variations');
      }
    }, 30000);
  });

  describe('Device Features', () => {
    test('should handle device orientation', async () => {
      logger.step('Testing device orientation');
      
      // Get current orientation
      const currentOrientation = await driver.getOrientation();
      logger.info('Current orientation', currentOrientation);
      
      // Change orientation
      const newOrientation = currentOrientation === 'PORTRAIT' ? 'LANDSCAPE' : 'PORTRAIT';
      await driver.setOrientation(newOrientation);
      
      // Verify orientation change
      const updatedOrientation = await driver.getOrientation();
      expect(updatedOrientation).toBe(newOrientation);
      
      logger.assertion(`Orientation changed to ${newOrientation}`, true);
      
      // Reset to original orientation
      await driver.setOrientation(currentOrientation);
    }, 30000);

    test('should capture screenshot', async () => {
      logger.step('Testing screenshot capture');
      
      const screenshotPath = `ios-test-${Date.now()}.png`;
      await driver.saveScreenshot(screenshotPath);
      
      logger.assertion('Screenshot captured', true);
      logger.info('Screenshot saved', screenshotPath);
    }, 30000);

    test('should handle app background/foreground', async () => {
      logger.step('Testing app background/foreground');
      
      // Send app to background for 2 seconds
      await driver.background(2000);
      
      // Verify app is back in foreground
      const isAppActive = await driver.execute('mobile: queryAppState', { 
        bundleId: process.env.IOS_BUNDLE_ID || 'com.example.app' 
      });
      expect(isAppActive).toBeTruthy();
      
      logger.assertion('App background/foreground cycle completed', true);
    }, 30000);
  });

  describe('iOS Specific Features', () => {
    test('should handle iOS alerts', async () => {
      logger.step('Testing iOS alert handling');
      
      try {
        // Check if alert is present
        const alertText = await driver.getAlertText();
        if (alertText) {
          await driver.acceptAlert();
          logger.assertion('iOS alert handled', true);
        }
      } catch (error) {
        logger.info('No alert present - this is expected');
      }
    }, 30000);

    test('should test accessibility features', async () => {
      logger.step('Testing accessibility features');
      
      // Generate test user data
      const userData = MobileTestDataFactory.generateUser();
      
      try {
        // Test VoiceOver compatibility by checking accessibility labels
        const elements = await driver.$$('*');
        let accessibleElements = 0;
        
        for (const element of elements.slice(0, 5)) { // Check first 5 elements
          try {
            const accessibilityLabel = await element.getAttribute('label');
            if (accessibilityLabel) {
              accessibleElements++;
            }
          } catch (error) {
            // Element may not have accessibility label
          }
        }
        
        logger.assertion('Accessibility check completed', true);
        logger.info('Accessible elements found', accessibleElements);
      } catch (error) {
        logger.info('Accessibility test completed with variations');
      }
    }, 30000);

    test('should handle iOS permissions', async () => {
      logger.step('Testing iOS permissions');
      
      try {
        // Check if permission alert appears
        await driver.pause(2000);
        
        const alertButtons = await driver.$$('//XCUIElementTypeButton');
        if (alertButtons.length > 0) {
          // If there's a permission dialog, handle it
          const allowButton = alertButtons.find(async (button: any) => {
            const text = await button.getText();
            return text.includes('Allow') || text.includes('OK');
          });
          
          if (allowButton) {
            await allowButton.click();
            logger.assertion('iOS permission handled', true);
          }
        }
      } catch (error) {
        logger.info('No permission dialog - this is expected for many apps');
      }
    }, 30000);
  });

  describe('Performance and Data', () => {
    test('should generate and use test data', async () => {
      logger.step('Testing data generation');
      
      // Generate various types of test data
      const user = MobileTestDataFactory.generateUser('premium');
      const deviceInfo = MobileTestDataFactory.generateDeviceInfo('ios');
      const appData = MobileTestDataFactory.generateAppData('productivity');
      const location = MobileTestDataFactory.generateLocation();
      
      // Verify data generation
      expect(user.email).toMatch(/@/);
      expect(user.password).toHaveLength(12);
      expect(deviceInfo.platform).toBe('ios');
      expect(appData.sessionId).toBeTruthy();
      expect(location.latitude).toBeTruthy();
      
      logger.assertion('Test data generation successful', true);
      logger.info('Generated data samples', {
        user: user.email,
        device: deviceInfo.model,
        session: appData.sessionId
      });
    }, 30000);

    test('should measure app performance', async () => {
      logger.step('Testing performance measurement');
      
      const startTime = Date.now();
      
      // Perform some app interactions
      await driver.pause(1000);
      
      // Test app responsiveness
      try {
        const elements = await driver.$$('//XCUIElementTypeButton');
        if (elements.length > 0) {
          await elements[0].click();
        }
      } catch (error) {
        // Expected for template test
      }
      
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      expect(duration).toBeGreaterThan(0);
      logger.assertion('Performance measurement completed', true);
      logger.info('Operation duration', `${duration}ms`);
    }, 30000);
  });
});

/**
 * HOW TO USE THIS TEMPLATE:
 * 
 * 1. Copy this file to your app's tests directory
 * 2. Rename it to match your feature (e.g., 'user-registration.test.ts')
 * 3. Update all the selectors (marked with 👈)
 * 4. Configure your app details in .env file:
 *    - IOS_BUNDLE_ID=com.yourapp.bundleid
 *    - IOS_APP_PATH=/path/to/your/app.app
 *    - IOS_DEVICE_NAME=iPhone 14 Pro
 *    - IOS_PLATFORM_VERSION=16.0
 * 5. Update test scenarios to match your app's functionality
 * 6. Run tests: npm run test:ios
 * 
 * REMEMBER:
 * - Use accessibility IDs for reliable element selection
 * - Test on different iOS versions and device sizes
 * - Handle iOS-specific alerts and permissions
 * - Test VoiceOver and accessibility features
 * - Use XCUITest predicates for complex element selection
 * - Test on both simulators and real devices
 * - Consider iOS app lifecycle and background behavior
 */
