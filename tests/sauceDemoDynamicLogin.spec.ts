import {test, expect} from '@playwright/test';
import { LoginPage } from '../pages/SauceDemoLogin';
import dynamicLoginData from '../test-data/dynamicLoginData.json'

//Dynamic Execution for all test users
dynamicLoginData.forEach((data) => {
    if(!data.run) return;
    
    if(data.run) {
        test(`Sauce Demo Login for: ${data.username}}`, async ({page}) => {
            //Creating Page Object instance
            const loginPage = new LoginPage(page);

            //Calling the methods from the Page Object
            await loginPage.gotoLoginPage();
            await loginPage.login(
                data.username,
                data.password
            );

            if(data.expected === "success") {
                await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
            } else {
                await expect(loginPage.errorMessage).toBeVisible();
            }
        })
    }
})