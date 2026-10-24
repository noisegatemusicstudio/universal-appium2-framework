Feature: App launch
  As a mobile product team
  I want to verify the app launches
  So that I have a basic end-to-end smoke test to build on

  @smoke
  Scenario: The initial app screen is available
    Then the initial app screen should expose a native view hierarchy
