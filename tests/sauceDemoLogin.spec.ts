import {test, expect} from '@playwright/test';
import { LoginPage } from '../pages/SauceDemoLogin.ts';
import loginData from '../test-data/loginData.json' with {type: 'json'};

//MULTIPLE TEST CASES INCLUDED

//Test Case #1
test('Sauce Demo valid login', async ({page}) => {
    //Creating Page Object instance
    const loginPage = new LoginPage(page);

    //Calling the methods from the Page Object
    await loginPage.gotoLoginPage();
    await loginPage.login(
        loginData.usernames.standard,
        loginData.sharedPassword
    );

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
})

//Test Case #2
test('Sauce Demo invalid login', async ({page}) => {
    //Creating Page Object instance
    const loginPage = new LoginPage(page);

    //Calling the methods from the Page Object
    await loginPage.gotoLoginPage();
    await loginPage.login(
        loginData.usernames.locked,
        loginData.sharedPassword
    );

    //Assertions should always be on the test script level
    await expect(loginPage.errorMessage).toBeVisible();
})
