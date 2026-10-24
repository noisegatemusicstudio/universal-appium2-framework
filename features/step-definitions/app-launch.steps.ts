import { Then } from "@wdio/cucumber-framework";
import appPage from "../../src/page-objects/app.page.js";

Then(
  "the initial app screen should expose a native view hierarchy",
  async () => {
    const viewHierarchy = await appPage.nativeViewHierarchy;

    expect(viewHierarchy.trim()).not.toBe("");
  },
);
