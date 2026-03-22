import { Page, Locator } from "@playwright/test";

export class RegisterPage {
  readonly openRegisterFormButton: Locator;
  readonly firstNameField: Locator;
  readonly lastNameField: Locator;
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly cityField: Locator;
  readonly countryField: Locator;
  readonly phoneField: Locator;
  readonly streetField: Locator;
  readonly zipCodeField: Locator;
  readonly submitRegistrationButton: Locator;

  constructor(readonly page: Page) {
    this.openRegisterFormButton = page.locator('[id="login-register-button"]');
    this.firstNameField = page.locator('[id="register-first-name"]');
    this.lastNameField = page.locator('[id="register-last-name"]');
    this.emailField = page.locator('[id="register-email"]');
    this.passwordField = page.locator('[id="register-password"]');
    this.cityField = page.locator('[id="register-city"]');
    this.countryField = page.locator('[id="register-country"]');
    this.phoneField = page.locator('[id="register-phone"]');
    this.streetField = page.locator('[id="register-street"]');
    this.zipCodeField = page.locator('[id="register-zip"]');
    this.submitRegistrationButton = page.locator('[id="register-button"]');
  }
  async navigate() {
    await this.page.goto("https://aqa-app.vercel.app/login");
  }

  async fillRegistrationForm()
  {
    await this.openRegisterFormButton.click();
    await this.firstNameField.fill("Ross");
    await this.lastNameField.fill("Geller");
    await this.emailField.fill("ross.geller@example.com");
    await this.passwordField.fill("password123");
    await this.cityField.fill("Dnipro");
    await this.countryField.selectOption("Ukraine");
    await this.phoneField.fill("+380345678901");
    await this.streetField.fill("123 Main St");
    await this.zipCodeField.fill("10001");
    await this.submitRegistrationButton.click();

  }



}
