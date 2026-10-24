import { sharedConfig } from "./wdio.shared.conf.js";

export const config: WebdriverIO.Config = {
  ...sharedConfig,
  capabilities: [
    {
      platformName: "Android",
      "appium:automationName": "UiAutomator2",
      "appium:deviceName":
        process.env.ANDROID_DEVICE_NAME ?? "Android Emulator",
      "appium:app": process.env.ANDROID_APP_PATH ?? "./apps/your-app.apk",
      "appium:autoGrantPermissions": true,
      "appium:newCommandTimeout": 120,
    },
  ],
};
