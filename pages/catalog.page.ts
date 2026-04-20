import { Page, Locator, expect } from "@playwright/test";
import { SelectedProducts } from "../data/types";




export class CatalogPage {
  readonly coffeeMachine: Locator; 
  readonly tabletProduct: Locator;
  readonly basketCount: Locator;
  readonly tabletName: Locator;
  readonly coffeeMachineName: Locator;
  readonly tabletPrice: Locator;
  readonly coffeeMachinePrice: Locator;

  constructor(readonly page: Page) {
    this.page = page;
    this.coffeeMachine = page.locator('[id="product-add-6"]');
    this.tabletProduct = page.locator('[id="product-add-5"]');
    this.tabletName = page.locator('[id="product-name-5"]');
    this.coffeeMachineName = page.locator('[id="product-name-6"]');
    this.tabletPrice = page.locator('[id="product-price-5"]');
    this.coffeeMachinePrice = page.locator('[id="product-price-6"]');
    this.basketCount = page.locator('[id="cart-count"]');
  }

  async selectProduct(): Promise<SelectedProducts> 
  {
    await this.coffeeMachine.click({delay: 2000});
    await this.tabletProduct.click({delay: 2000});
    await this.page.waitForLoadState('networkidle');
    await this.basketCount.waitFor();
    
    await expect(this.basketCount).toBeVisible();
    await expect(this.basketCount).toHaveText('2', {timeout: 3000});

    const itemsInfo = await this.getProductInfo();
    await this.basketCount.click();

    return itemsInfo;
  }

  async getProductInfo(): Promise<SelectedProducts>
  {
    return {
      firstProduct: {
        name: await this.tabletName.innerText(),
        price: await this.tabletPrice.innerText()
      },

      secondProduct:{
        name: await this.coffeeMachineName.innerText(),
        price: await this.coffeeMachinePrice.innerText()
      }
    }  
  }
}