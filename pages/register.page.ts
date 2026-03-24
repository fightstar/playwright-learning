import { Page, Locator } from "@playwright/test";
import type { UserData } from "../data/testData";

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

  async fillRegistrationForm( testData: UserData)
  {
    await this.openRegisterFormButton.click();
    await this.firstNameField.fill(testData.firstName);
    await this.lastNameField.fill(testData.lastName);
    await this.emailField.fill(testData.email);
    await this.passwordField.fill(testData.password);
    await this.cityField.fill(testData.city);
    await this.countryField.selectOption(testData.country);
    await this.phoneField.fill(testData.phone);
    await this.streetField.fill(testData.street);
    await this.zipCodeField.fill(testData.zipCode);
    await this.submitRegistrationButton.click();

  }

}
