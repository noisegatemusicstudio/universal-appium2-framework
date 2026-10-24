# Mobile E2E test conventions

- Use Cucumber feature files for readable user scenarios and TypeScript step definitions as thin orchestration.
- Put app selectors and screen actions in Page Object Models under `src/page-objects/`; prefer accessibility identifiers supplied by the app team.
- Keep assertions about scenario outcomes in step definitions. Avoid duplicating selectors or low-level interactions across steps.
- Do not invent selectors, credentials, app behavior, or device capabilities. Ask for missing app-specific details or keep examples explicitly generic.
- Prefer official WebdriverIO, Cucumber, and Appium APIs and packages. Do not add framework wrappers or custom test infrastructure without a concrete need.
- AI assistance may draft scenarios or page objects, but generated tests must be reviewed and run against the target app. Test execution must not depend on an AI service.
