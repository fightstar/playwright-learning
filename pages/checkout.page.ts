import { Page, Locator, expect } from "@playwright/test";

export class CheckoutPage
{
    readonly cardNumberField : Locator;
    readonly expireDate : Locator;
    readonly cvvCode : Locator;
    readonly payNowBtn : Locator;
    readonly successOrder: Locator;
    readonly myAccountLink: Locator;

    constructor(readonly page : Page)
    {
        this.page = page;
        this.cardNumberField = page.getByPlaceholder('Card Number (16 digits)');
        this.expireDate = page.getByPlaceholder('MM/YY');
        this.cvvCode = page.getByPlaceholder('CVV (3 digits)');
        this.payNowBtn = page.getByRole('button',{name: 'Pay Now'});
        this.successOrder = page.locator('[id="checkout-success"]');
        this.myAccountLink = page.locator('[href="/account"]');

    }
    async fillPaymentData(cardNumber:string, expireDate:string, cvvCode:string)
    {
        await this.cardNumberField.type(cardNumber, {delay:100});
        await this.cardNumberField.press('Enter');
        await this.expireDate.fill(expireDate);
        await this.cvvCode.fill(cvvCode);
        await this.payNowBtn.first().click();
    }

    async successOrderMessage()
    {
        await expect(this.successOrder).toBeVisible;
    }

    async goToMyAccount()
    {
        await this.myAccountLink.click();
        await expect(this.page).toHaveURL('https://aqa-app.vercel.app/account');
    }

}