import {test as base} from '@playwright/test';
import {LoginPage} from '../pages/SauceDemoLogin.ts';
import loginData from '../test-data/loginData.json';

type MyFixtures101 = {
    loginPage: LoginPage;
}

export const test = base.extend<MyFixtures101> ({
    loginPage: async ({page}, use) => {
        //Setup the Fixture - Pre-test Fixture Actions
        console.log("I'M LOGGIN IN!!");
        const loginPage = new LoginPage(page);
        //Login Actions executed before the main test
        await loginPage.gotoLoginPage();
        await loginPage.login(
            loginData.usernames.standard,
            loginData.sharedPassword
        );

        //Use the fixture within the test
        await use(loginPage);

        //Post-test Fixture Actions
        //Logout actions executed after the main test
        console.log("HERE SHOULD BE THE LOGOUT ACTIONS!");
    }
})

export { expect } from '@playwright/test';