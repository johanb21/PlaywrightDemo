import {test, expect} from '../fixtures/sauceDemoLoginFixture.ts';

// This imported test now has all the context from the Fixture  
// instead of the default '@playwright/test'
test('Sauce Demo Login FIXTURE method', async({loginPage, page}) => {

    //LOG IN SHOULD HAPPEN BEFORE THE TEST ASSERTION IN THE FIXTURE

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    console.log("I'm logged in!");

    //LOG OUT SHOULD HAPPEN AFTER THE TEST ASSERTION IN THE FUXTURE

})