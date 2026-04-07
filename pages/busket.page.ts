import { Page, Locator, expect } from "@playwright/test";
import { CatalogPage } from "./catalog.page";

export class BusketPage {
  readonly firstProductItem: Locator;
  readonly secondProductItem: Locator;
  readonly firstItemPrice: Locator;
  readonly secondItemPrice: Locator;
  readonly totalValue: Locator;
  readonly checkoutBtn: Locator;
  readonly removeFirstItemBtn: Locator;
  readonly addFirstItemBtn: Locator;
  tabletNameValue: string;
  coffeeMachineNameValue: string;
  tabletPriceValue: string;
  coffeeMachinePriceValue: string;
  readonly totalCount: Locator;

  constructor(
    readonly page: Page,
    tabletNameValue: string,
    coffeeMachineNameValue: string,
    tabletPriceValue: string,
    coffeeMachinePriceValue: string,
  ) {
    this.page = page;
    this.firstProductItem = page.locator('[id="cart-item-name-6"]');
    this.secondProductItem = page.locator('[id="cart-item-name-5"]');
    this.firstItemPrice = page.locator('[id="cart-item-price-6"]');
    this.secondItemPrice = page.locator('[id="cart-item-price-5"]');
    this.totalValue = page.locator('[id="cart-total"]');
    this.checkoutBtn = page.locator('[id="cart-checkout-button"]');
    this.removeFirstItemBtn = page.locator('[id="cart-item-decrease-6"]');
    this.addFirstItemBtn = page.locator('[id="cart-item-increase-6"]');

    this.tabletNameValue = tabletNameValue;
    this.coffeeMachineNameValue = coffeeMachineNameValue;
    this.tabletPriceValue = tabletPriceValue;
    this.coffeeMachinePriceValue = coffeeMachinePriceValue;
    this.totalCount = page.locator('[id="cart-total"]');
  }

  async CompareProductDetails() {
    await expect(this.firstProductItem).toHaveText(this.coffeeMachineNameValue);
    await expect(this.secondProductItem).toHaveText(this.tabletNameValue);
    await expect(this.firstItemPrice).toHaveText(this.coffeeMachinePriceValue);
    await expect(this.secondItemPrice).toHaveText(this.tabletPriceValue);
  }

  async CheckTotalPrice() {
    const firstPriceNumber = Number(
      (await this.firstItemPrice.innerText()).replace(/\D/g, ""),
    );
    const secondPriceNumber = Number(
      (await this.secondItemPrice.innerText()).replace(/\D/g, ""),
    );

    const totalNumber = parseInt(
      (await this.totalValue.innerText()).replace(/[^\d.]/g, ""),
      10,
    );

    expect(totalNumber).toBe(firstPriceNumber + secondPriceNumber);
    await this.checkoutBtn.click({force: true});

    await this.page.waitForURL('https://aqa-app.vercel.app/checkout');
  }
}
