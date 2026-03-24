import { Page, Locator } from "@playwright/test";

export class LoginPage {
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;

  constructor(readonly page: Page) {
    this.page = page;
    this.emailField = page.locator('[id="login-email"]');
    this.passwordField = page.locator('[id="login-password"]');
    this.loginButton = page.locator('[id="login-button"]');
  }
}
