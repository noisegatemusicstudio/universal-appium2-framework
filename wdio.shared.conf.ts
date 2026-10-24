import "dotenv/config";

type SharedConfig = Omit<WebdriverIO.Config, "capabilities">;

export const sharedConfig: SharedConfig = {
  runner: "local",
  specs: ["./features/**/*.feature"],
  maxInstances: 1,
  logLevel: "info",
  framework: "cucumber",
  reporters: [
    "spec",
    [
      "allure",
      {
        outputDir: "allure-results",
      },
    ],
  ],
  services: [
    [
      "appium",
      {
        command: "appium",
      },
    ],
  ],
  waitforTimeout: 10_000,
  connectionRetryTimeout: 120_000,
  connectionRetryCount: 1,
  cucumberOpts: {
    require: ["./features/step-definitions/**/*.ts"],
    timeout: 60_000,
  },
};
