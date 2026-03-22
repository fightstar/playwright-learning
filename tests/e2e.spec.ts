import { test, expect } from "@playwright/test";
import { RegisterPage } from "../pages/register.page";

test("test", async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.navigate();
    await registerPage.fillRegistrationForm();
});
