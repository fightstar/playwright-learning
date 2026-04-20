import { test, expect } from "@playwright/test";
import { newUser1 } from "../data/testData";
import {cardData} from "../data/testData";
import { BusketPage, CatalogPage, CheckoutPage, LoginPage, MyAccountPage, RegisterPage } from "../pages";

test.setTimeout(60000);
test("Create user,login, order 2 items, payment", async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);
    const catalogPage = new CatalogPage(page);
    const checkoutPage = new CheckoutPage(page);
    const myAccountPage = new MyAccountPage(page);
    await registerPage.openLoginPage();
    await registerPage.fillRegistrationForm(newUser1);
    await loginPage.login(newUser1.email, newUser1.password);
    const items = await catalogPage.selectProduct();
    
    const busketPage = new BusketPage(page);
    await busketPage.CompareProductDetails(items);
    await busketPage.CheckTotalPrice();
    await checkoutPage.fillPaymentData(cardData.cardNumberField, cardData.expireDate, cardData.cvvCode);
    await checkoutPage.successOrderMessage();
    await checkoutPage.goToMyAccount();
    await myAccountPage.checkFinalOrder(items.firstProduct.price, items.secondProduct.price);
    await myAccountPage.checkTwoItems();
});

