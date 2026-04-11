import { Page, Locator, expect } from "@playwright/test";

export class MyAccountPage {
  readonly items: Locator;
  readonly totalAnountField: Locator;
  readonly logoutBtn: Locator;

  constructor(readonly page: Page) {
    this.page = page;
    this.items = page.locator("#account-order-0 ul > li");
    this.totalAnountField = page.locator("#account-order-0", {
      hasText: "Total Amount:",
    });
    this.logoutBtn = page.locator('[id="account-logout-button"]');
  }

  async checkFinalOrder(firstItemPrice : string, secondItemPrice : string )
  {
    const totalPrice = 
    Number(firstItemPrice.replace('$', '')) + Number(secondItemPrice.replace('$', ''));
    const totalAmount = await this.totalAnountField.innerText();
    console.log(`Total Ampunt:} ${totalAmount}`); 
    await expect(this.totalAnountField).toContainText(`${totalPrice}`);
  }

  async checkTwoItems()
  {
    await expect(this.items.first()).toBeVisible();
    await expect(this.items.last()).toBeVisible();
    await expect(this.logoutBtn).toBeEnabled();

  }
  
  async logout()
  {
    await this.logoutBtn.click();
  }

}
