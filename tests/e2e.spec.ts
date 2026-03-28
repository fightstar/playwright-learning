import { test, expect } from "@playwright/test";
import { RegisterPage } from "../pages/register.page";
import { LoginPage } from "../pages/login.page";
import { newUser1 } from "../data/testData";
import { CatalogPage } from "../pages/catalog.page";




test("test", async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);
    const catalogPage = new CatalogPage(page);
    await registerPage.navigate();
    await registerPage.fillRegistrationForm(newUser1);
    await loginPage.login(newUser1.email, newUser1.password);
    await catalogPage.selectProduct();
});

