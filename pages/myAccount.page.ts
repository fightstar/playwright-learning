import { Page, Locator, expect } from "@playwright/test";

export class MyAccountPage {
  readonly items: Locator;
  readonly totalAnountField: Locator;

  constructor(readonly page: Page) {
    this.page = page;
    this.items = page.locator("#account-order-0 ul > li");
    this.totalAnountField = page.locator("#account-order-0", {
      hasText: "Total Amount:",
    });
  }

  async checkFinalOrder(firstItemPrice : string, secondItemPrice : string )
  {
    const totalPrice = 
    Number(firstItemPrice.replace('$', '')) + Number(secondItemPrice.replace('$', ''));
    const totalAmount = await this.totalAnountField.innerText();
    console.log(`Total Ampunt:} ${totalAmount}`); 
    await expect(this.totalAnountField).toContainText(`${totalPrice}`);
    await this.page.pause(); 
  }
}
