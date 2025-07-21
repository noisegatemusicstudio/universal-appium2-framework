# 📱 Universal Appium2 Mobile Testing Framework

A **production-ready**, **plug-and-play** mobile testing framework built with Appium2, WebDriverIO, and TypeScript.

**🌟 Use this framework for ANY mobile application** - simply add as a submodule and start testing in minutes!

## ⚡ 5-Minute Setup for Any Mobile Project

```bash
# 1. Add framework to your project
git submodule add <framework-repo-url> test-frameworks/appium2-framework

# 2. Install and setup
cd test-frameworks/appium2-framework
npm install

# 3. Configure for your app
echo 'ANDROID_APP_PACKAGE=com.yourapp.package' > .env
echo 'ANDROID_APP_ACTIVITY=.MainActivity' >> .env

# 4. Start Appium server
npm run start:appium

# 5. Run example tests
npm run test:android

# 6. Create your first test (copy and customize example-app.test.ts)
```

**That's it! You now have professional mobile E2E testing for your app.** 🎉

## 🚀 Key Features

### ✅ Universal Design
- **Cross-Platform**: Works with Android and iOS applications
- **Framework Agnostic**: React Native, Flutter, Native, Ionic, Xamarin
- **Quick Setup**: Get started in under 5 minutes
- **Git Submodule Ready**: Easy integration into existing projects

### 🏗️ Professional Architecture
- **Page Object Model**: Clean, maintainable test structure
- **Component-Based**: Reusable mobile UI components
- **TypeScript First**: Full type safety and IntelliSense support
- **Multi-Platform**: Unified API for Android and iOS testing

### 📱 Mobile-Specific Features
- **Touch Gestures**: Tap, swipe, pinch, long press, drag & drop
- **Device Management**: Orientation, background/foreground, app lifecycle
- **Platform Utilities**: Hide keyboard, take screenshots, device info
- **Real Device Support**: Works with simulators, emulators, and real devices

### 🧪 Testing Capabilities
- **Parallel Testing**: Run tests across multiple devices simultaneously
- **Smart Waiting**: Intelligent wait strategies for mobile elements
- **Test Data Generation**: Realistic mobile-specific test data
- **Visual Testing**: Screenshot comparison and visual regression
- **Performance Monitoring**: App launch time, memory usage

## 📁 Framework Structure

```
appium2-framework/
├── 📜 README.md                    # This file
├── 📦 package.json                 # Dependencies and scripts
├── ⚙️ jest.config.js               # Test runner configuration
├── 🔧 jest.android.config.js       # Android-specific test config
├── 🔧 jest.ios.config.js           # iOS-specific test config
├── 📝 tsconfig.json               # TypeScript configuration
├── 
├── 📂 src/                         # Framework core (reusable)
│   ├── 📄 pages/base-page.ts       # Universal mobile page object
│   ├── 📄 components/              # Reusable mobile UI components
│   └── 📄 utils/                   # Driver management, logging
├── 
├── 📂 fixtures/                    # Mobile test data generation
├── 📂 tests/                       # Example tests and templates
│   ├── 📂 android/                 # Android-specific tests
│   ├── 📂 ios/                     # iOS-specific tests
│   └── 📂 shared/                  # Cross-platform tests
├── 
├── 📂 config/                      # Test environment configurations
└── 📂 docs/                       # Comprehensive documentation
```

## 🔧 Configuration

### Environment Variables (.env)

```bash
# Appium Server
APPIUM_HOST=localhost
APPIUM_PORT=4723

# Platform Selection
PLATFORM=android  # or ios

# Android Configuration
ANDROID_VERSION=13.0
ANDROID_DEVICE_NAME=Android Emulator
ANDROID_APP_PACKAGE=com.yourapp.package
ANDROID_APP_ACTIVITY=.MainActivity
ANDROID_APP_PATH=/path/to/your/app.apk

# iOS Configuration
IOS_VERSION=16.0
IOS_DEVICE_NAME=iPhone 14
IOS_BUNDLE_ID=com.yourapp.bundle
IOS_APP_PATH=/path/to/your/app.app

# Test Configuration
NO_RESET=false
FULL_RESET=false
```

## 🧪 Example Usage

### Creating a Page Object

```typescript
import { BasePage } from '@/pages/base-page';
import { Browser } from 'webdriverio';

export class LoginPage extends BasePage {
  constructor(driver: Browser<'async'>, platform: 'android' | 'ios') {
    super(driver, platform);
  }

  // Platform-specific selectors
  private get emailInput() {
    return this.getSelector(
      'android=new UiSelector().resourceId("email_input")',
      'ios=.XCUIElementTypeTextField[`name == "email_input"`]'
    );
  }

  private get passwordInput() {
    return this.getSelector(
      'android=new UiSelector().resourceId("password_input")',
      'ios=.XCUIElementTypeSecureTextField[`name == "password_input"`]'
    );
  }

  private get loginButton() {
    return this.getSelector(
      'android=new UiSelector().resourceId("login_button")',
      'ios=.XCUIElementTypeButton[`name == "login_button"`]'
    );
  }

  async login(email: string, password: string): Promise<void> {
    await this.inputText(this.emailInput, email);
    await this.inputText(this.passwordInput, password);
    await this.clickElement(this.loginButton);
  }
}
```

### Writing Tests

```typescript
import { DriverManager } from '@utils/driver-manager';
import { MobileTestDataFactory } from '@fixtures/mobile-test-data-factory';
import { LoginPage } from '../pages/login-page';

describe('Login Flow', () => {
  let driver: Browser<'async'>;
  let loginPage: LoginPage;
  const platform = process.env.PLATFORM as 'android' | 'ios';

  beforeAll(async () => {
    driver = await DriverManager.getInstance().initializeDriver(platform);
    loginPage = new LoginPage(driver, platform);
  });

  afterAll(async () => {
    await DriverManager.getInstance().quitDriver();
  });

  test('should login with valid credentials', async () => {
    const userData = MobileTestDataFactory.generateUser();
    
    await loginPage.login(userData.email, userData.password);
    
    // Add your assertions here
    expect(await driver.getCurrentActivity()).toContain('Dashboard');
  });
});
```

## 🎯 Available Scripts

```bash
# Start Appium server
npm run start:appium

# Run tests
npm run test                 # All tests
npm run test:android        # Android tests only
npm run test:ios           # iOS tests only
npm run test:headed        # Verbose output
npm run test:debug         # Debug mode

# Device management
npm run start:android       # List Android devices
npm run start:ios          # List iOS simulators

# Code quality
npm run lint               # Check code quality
npm run lint:fix          # Fix linting issues
npm run format            # Format code
npm run build             # Compile TypeScript
```

## 📱 Platform Support

### Android
- **Supported Versions**: Android 8+ (API level 26+)
- **Device Types**: Real devices, Android emulators
- **Automation Engine**: UiAutomator2
- **Requirements**: Android SDK, ADB

### iOS
- **Supported Versions**: iOS 13+
- **Device Types**: Real devices, iOS simulators
- **Automation Engine**: XCUITest
- **Requirements**: Xcode, iOS SDK

## 🔄 Device Setup

### Android Setup
1. Install Android Studio and SDK
2. Enable Developer Options and USB Debugging
3. Install Appium UiAutomator2 driver: `appium driver install uiautomator2`

### iOS Setup
1. Install Xcode and command line tools
2. Install Appium XCUITest driver: `appium driver install xcuitest`
3. For real devices: Set up provisioning profiles and certificates

## 🧪 Test Data Generation

The framework includes smart test data generation for mobile apps:

```typescript
// Generate user data
const user = MobileTestDataFactory.generateUser();

// Generate device info
const deviceInfo = MobileTestDataFactory.generateDeviceInfo('android');

// Generate app-specific data
const musicAppData = MobileTestDataFactory.generateAppData('music');

// Generate location data
const location = MobileTestDataFactory.generateLocation();

// Generate payment info (test data only)
const payment = MobileTestDataFactory.generatePaymentInfo();
```

## 🎨 Customization

### For Your Mobile App

1. **Update Selectors**: Modify page objects to match your app's UI
2. **Configure Capabilities**: Update device and app settings in .env
3. **Create Page Objects**: Build page objects for your app's screens
4. **Add Test Data**: Customize test data factory for your app's needs
5. **Write Tests**: Create test scenarios specific to your app

### Example App Integration

```typescript
// 1. Create your app's page objects in tests/your-app/pages/
// 2. Configure environment variables
// 3. Create test specifications in tests/your-app/
// 4. Run tests: npm run test tests/your-app/
```

## 🚀 CI/CD Integration

The framework works seamlessly with CI/CD pipelines:

```yaml
# Example GitHub Actions
- name: Setup Android SDK
  uses: android-actions/setup-android@v2

- name: Install dependencies
  run: |
    cd test-frameworks/appium2-framework
    npm ci

- name: Start Appium
  run: |
    cd test-frameworks/appium2-framework
    npm run start:appium &

- name: Run mobile tests
  run: |
    cd test-frameworks/appium2-framework
    npm run test:android
```

## 🔧 Troubleshooting

### Common Issues

1. **Driver not found**: Ensure Appium drivers are installed
2. **Device not detected**: Check ADB/iOS device connection
3. **App not launching**: Verify app package/bundle ID
4. **Elements not found**: Update selectors for your app version

### Debug Mode

```bash
# Run with debug output
npm run test:debug

# Take screenshots for debugging
await this.takeScreenshot('debug-screenshot.png');

# Get page source
const source = await this.getPageSource();
console.log(source);
```

## 📖 Documentation

- **Quick Start**: Get up and running in 5 minutes
- **API Reference**: Complete method documentation
- **Best Practices**: Mobile testing patterns and strategies
- **Examples**: Real-world implementation samples

## 🤝 Contributing

We welcome contributions! See our contributing guide for:
- Code standards and patterns
- Testing guidelines
- Documentation requirements
- Pull request process

## 📄 License

MIT License - See LICENSE file for details

---

**Ready to test any mobile app with professional-grade automation!** 🚀📱

For detailed guides and examples, see the `docs/` directory.
