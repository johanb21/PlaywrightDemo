import type {Page, Locator} from '@playwright/test';

export class LoginPage {

    //readonly restricts the attributes to be accessible only throught this class' methods
    readonly page: Page;
    readonly username: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.username = page.locator('#user-name'); //CSS Selector format / Xpath would be ('input[id="user-name"]);
        this.password = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.errorMessage = page.locator('h3[data-test="error"]'); //Xpath format
    }

    async gotoLoginPage() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login(user: string, password: string) {
        await this.username.fill(user);
        await this.password.fill(password);
        await this.loginButton.click();
    }
}