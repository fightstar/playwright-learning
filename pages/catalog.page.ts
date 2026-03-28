import { Page, Locator, expect } from "@playwright/test";

export class CatalogPage {
  readonly coffeeMachine: Locator; 
  readonly tabletProduct: Locator;
  readonly basketCount: Locator;
  
  constructor(readonly page: Page) {
    this.page = page;
    this.coffeeMachine = page.locator('[id="product-add-6"]');
    this.tabletProduct = page.locator('[id="product-add-5"]');
    this.basketCount = page.locator('[id="cart-count"]');
  }

  async selectProduct()
  {
    await this.coffeeMachine.click({delay: 2000});
    await this.tabletProduct.click({delay: 2000});
    await this.page.waitForLoadState('networkidle');
    await this.basketCount.waitFor();
    
    await expect(this.basketCount).toBeVisible();
    await expect(this.basketCount).toHaveText('2', {timeout: 2000});
  }
}