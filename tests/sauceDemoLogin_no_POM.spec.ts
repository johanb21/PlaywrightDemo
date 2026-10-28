import {test, expect} from '@playwright/test';
import type {Locator} from '@playwright/test';

test('Sauce Demo login', async ({page}) => {
    await page.goto('https://www.saucedemo.com/'); 

    //Here's an example of Typescript being put in use
    const username: Locator = page.locator('input[id="user-name"]');
    const password: Locator = page.locator('input[id="password"]');

    //Now typescript recognizes all the functions for the Locator objects
    //and inmediately shows a compile error if uses incorrectly (Javascript wouldn't show errors until runtime)
    await username.fill('standard_user');
    await password.fill('secret_sauce');
    await page.keyboard.press('Enter');
    
    //This asertion could fail without the 'await' on certain browsers
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html'); 
    const dashboardTitle: Locator = page.getByText('Swag Labs');
    const productHeader: Locator = page.locator('span:has-text("Products")');
    await expect(dashboardTitle).toBeVisible();
    await expect(productHeader).toBeVisible();
}
)