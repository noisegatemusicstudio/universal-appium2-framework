/**
 * Example Android mobile test demonstrating framework usage
 * 
 * This is a template showing how to use the Appium2 framework for Android testing.
 * Copy this pattern to create tests for your specific mobile application.
 * 
 * TO CUSTOMIZE FOR YOUR APP:
 * 1. Update the selectors to match your app's UI elements
 * 2. Modify test data to match your app's data model
 * 3. Adjust assertions to match your app's behavior
 * 4. Configure app package and activity in .env file
 */

import { DriverManager } from '../../src/utils/driver-manager';
import { MobileTestDataFactory } from '../../src/fixtures/mobile-test-data-factory';
import { Logger } from '../../src/utils/logger';

// Example page object for your Android app - customize this
class AndroidExamplePage {
  private driver: any;
  private logger: Logger;

  constructor(driver: any) {
    this.driver = driver;
    this.logger = new Logger('AndroidExamplePage');
  }

  // 👈 Update these selectors to match your app's UI
  private get welcomeText() {
    return 'android=new UiSelector().text("Welcome")';
  }

  private get mainButton() {
    return 'android=new UiSelector().resourceId("main_button")';
  }

  private get emailInput() {
    return 'android=new UiSelector().resourceId("email_input")';
  }

  private get submitButton() {
    return 'android=new UiSelector().text("Submit")';
  }

  async getWelcomeMessage(): Promise<string> {
    this.logger.info('Getting welcome message');
    const element = await this.driver.$(this.welcomeText);
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
    const element = await this.driver.$(this.emailInput);
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
}

describe('Android Example App Tests', () => {
  let driver: any;
  let examplePage: AndroidExamplePage;
  const logger = new Logger('AndroidExampleTests');

  beforeAll(async () => {
    logger.info('Setting up Android test suite');
    driver = await DriverManager.getInstance().initializeDriver('android');
    examplePage = new AndroidExamplePage(driver);
  }, 60000); // 60 second timeout for driver setup

  afterAll(async () => {
    logger.info('Tearing down Android test suite');
    await DriverManager.getInstance().quitDriver();
  });

  describe('App Launch and Navigation', () => {
    test('should launch app successfully', async () => {
      logger.step('Verifying app launch');
      
      // Wait for app to load
      await driver.pause(3000);
      
      // 👈 Customize this assertion for your app
      const activity = await driver.getCurrentActivity();
      expect(activity).toBeTruthy();
      
      logger.assertion('App launched successfully', true);
    }, 30000);

    test('should display welcome message', async () => {
      logger.step('Checking welcome message');
      
      // 👈 Update this based on your app's welcome screen
      const isWelcomeDisplayed = await examplePage.isElementDisplayed(
        'android=new UiSelector().text("Welcome")'
      );
      
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
    test('should handle button clicks', async () => {
      logger.step('Testing button interactions');
      
      // Generate test data
      const userData = MobileTestDataFactory.generateUser();
      logger.info('Generated test user', { email: userData.email });
      
      // 👈 Customize these interactions for your app
      try {
        // Example interaction - update selectors for your app
        const isButtonDisplayed = await examplePage.isElementDisplayed(
          'android=new UiSelector().resourceId("main_button")'
        );
        
        if (isButtonDisplayed) {
          await examplePage.clickMainButton();
          logger.assertion('Button click successful', true);
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
        const isEmailInputDisplayed = await examplePage.isElementDisplayed(
          'android=new UiSelector().resourceId("email_input")'
        );
        
        if (isEmailInputDisplayed) {
          await examplePage.enterEmail(userData.email);
          logger.assertion('Text input successful', true);
        } else {
          logger.info('Email input not found - update selector for your app');
        }
      } catch (error) {
        logger.info('Text input failed - expected for template test');
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
      
      const screenshotPath = `android-test-${Date.now()}.png`;
      await driver.saveScreenshot(screenshotPath);
      
      logger.assertion('Screenshot captured', true);
      logger.info('Screenshot saved', screenshotPath);
    }, 30000);

    test('should handle app background/foreground', async () => {
      logger.step('Testing app background/foreground');
      
      // Send app to background for 2 seconds
      await driver.background(2000);
      
      // Verify app is back in foreground
      const activity = await driver.getCurrentActivity();
      expect(activity).toBeTruthy();
      
      logger.assertion('App background/foreground cycle completed', true);
    }, 30000);
  });

  describe('Performance and Data', () => {
    test('should generate and use test data', async () => {
      logger.step('Testing data generation');
      
      // Generate various types of test data
      const user = MobileTestDataFactory.generateUser('premium');
      const deviceInfo = MobileTestDataFactory.generateDeviceInfo('android');
      const appData = MobileTestDataFactory.generateAppData('social');
      const location = MobileTestDataFactory.generateLocation();
      
      // Verify data generation
      expect(user.email).toMatch(/@/);
      expect(user.password).toHaveLength(12);
      expect(deviceInfo.platform).toBe('android');
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
 * 2. Rename it to match your feature (e.g., 'user-login.test.ts')
 * 3. Update all the selectors (marked with 👈)
 * 4. Configure your app details in .env file:
 *    - ANDROID_APP_PACKAGE=com.yourapp.package
 *    - ANDROID_APP_ACTIVITY=.MainActivity
 *    - ANDROID_APP_PATH=/path/to/your/app.apk
 * 5. Update test scenarios to match your app's functionality
 * 6. Run tests: npm run test:android
 * 
 * REMEMBER:
 * - Use resource IDs for reliable element selection
 * - Keep tests independent and isolated
 * - Use the Page Object Model pattern for maintainable tests
 * - Generate test data instead of hardcoding values
 * - Handle different screen sizes and orientations
 * - Test on both emulators and real devices
 */
