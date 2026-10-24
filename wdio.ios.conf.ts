import { sharedConfig } from "./wdio.shared.conf.js";

export const config: WebdriverIO.Config = {
  ...sharedConfig,
  capabilities: [
    {
      platformName: "iOS",
      "appium:automationName": "XCUITest",
      "appium:deviceName": process.env.IOS_DEVICE_NAME ?? "iPhone Simulator",
      "appium:app": process.env.IOS_APP_PATH ?? "./apps/your-app.app",
      "appium:newCommandTimeout": 120,
    },
  ],
};
