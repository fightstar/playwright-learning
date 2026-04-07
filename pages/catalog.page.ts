import { Page, Locator, expect } from "@playwright/test";

export class CatalogPage {
  readonly coffeeMachine: Locator; 
  readonly tabletProduct: Locator;
  readonly basketCount: Locator;
  readonly tabletName: Locator;
  readonly coffeeMachineName: Locator;
  readonly tabletPrice: Locator;
  readonly coffeeMachinePrice: Locator;
  tabletNameValue: string;
  coffeeMachineNameValue: string;
  tabletPriceValue: string;
  coffeeMachinePriceValue: string;  

  constructor(readonly page: Page) {
    this.page = page;
    this.coffeeMachine = page.locator('[id="product-add-6"]');
    this.tabletProduct = page.locator('[id="product-add-5"]');
    this.tabletName = page.locator('[id="product-name-5"]');
    this.coffeeMachineName = page.locator('[id="product-name-6"]');
    this.tabletPrice = page.locator('[id="product-price-5"]');
    this.coffeeMachinePrice = page.locator('[id="product-price-6"]');
    this.basketCount = page.locator('[id="cart-count"]');
    this.tabletNameValue = '';
    this.coffeeMachineNameValue = '';
    this.tabletPriceValue = '';
    this.coffeeMachinePriceValue = '';
  }

  async selectProduct()
  {
    await this.coffeeMachine.click({delay: 2000});
    await this.tabletProduct.click({delay: 2000});
    await this.page.waitForLoadState('networkidle');
    await this.basketCount.waitFor();
    
    await expect(this.basketCount).toBeVisible();
    await expect(this.basketCount).toHaveText('2', {timeout: 3000});
    await this.saveProductInfo();
    await this.basketCount.click();
  }

  async saveProductInfo()
  {
    this.tabletNameValue = await this.tabletName.innerText() || '';
    this.coffeeMachineNameValue = await this.coffeeMachineName.innerText() || '';
    this.tabletPriceValue = await this.tabletPrice.innerText() || '';
    this.coffeeMachinePriceValue = await this.coffeeMachinePrice.innerText() || '';
  }
}