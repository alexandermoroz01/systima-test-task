import BasePage from '@pages/base.page';
import { Locator, Page, TestInfo, expect, test } from '@playwright/test';
import moment from "moment";

class LoginPage extends BasePage {
    public endpoint = 'login';
    //locators
    public usernameInput: Locator;
    public passInput: Locator;
    public loginBtn: Locator;
    public alertMsg: Locator;

    constructor(page: Page, testInfo: TestInfo) {
        super(page, testInfo);
        this.initSelectors()
    }

    private initSelectors() {
        this.usernameInput = this.page.locator(`//input[@name="email"]`);
        this.passInput = this.page.locator(`//input[@name="password"]`);
        this.loginBtn = this.page.locator(`//button[@type="submit"]//span[text()='Logg inn']`);
        this.alertMsg = this.page.locator(`//div[@class="v-alert__content"]`);
    }

    public updatePage(newPage: Page) {
        this.page = newPage;
        this.initSelectors();
    }

    async login(creds?: {username?: string, password?: string}){
        const {username, password} = creds ?? {};

        if(username !== undefined) await this.fill(this.usernameInput, username);
        if(password !== undefined) await this.fill(this.passInput, password);

        await this.click(this.loginBtn);
    }



}

export default LoginPage;