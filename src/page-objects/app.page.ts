class AppPage {
  get nativeViewHierarchy(): Promise<string> {
    return browser.getPageSource();
  }
}

export default new AppPage();
