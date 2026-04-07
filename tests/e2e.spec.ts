import { test, expect } from "@playwright/test";
import { newUser1 } from "../data/testData";
import {cardData} from "../data/testData";
import { BusketPage, CatalogPage, CheckoutPage, LoginPage, RegisterPage } from "../pages";

test.setTimeout(60000);
test("test", async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);
    const catalogPage = new CatalogPage(page);
    const checkoutPage = new CheckoutPage(page);
    await registerPage.navigate();
    await registerPage.fillRegistrationForm(newUser1);
    await loginPage.login(newUser1.email, newUser1.password);
    await catalogPage.selectProduct();
    
    const busketPage = new BusketPage(page, catalogPage.tabletNameValue, catalogPage.coffeeMachineNameValue, catalogPage.tabletPriceValue, catalogPage.coffeeMachinePriceValue);
    await busketPage.CompareProductDetails();
    await busketPage.CheckTotalPrice();
    await checkoutPage.fillPaymentData(cardData.cardNumberField, cardData.expireDate, cardData.cvvCode);
    await checkoutPage.successOrderMessage();
    await checkoutPage.goToMyAccount();
});

