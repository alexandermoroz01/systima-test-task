import BasePage from '@pages/base.page';
import { Locator, Page, TestInfo, expect, test } from '@playwright/test';

class DashboardPage extends BasePage {
    public endpoint = 'systimaas7/dashboard';
    //locators
    public usernameInput: Locator;


    constructor(page: Page, testInfo: TestInfo) {
        super(page, testInfo);
        this.initSelectors()
    }

    private initSelectors() {
        this.usernameInput = this.page.locator(`//input[@name="email"]`);

    }

    public updatePage(newPage: Page) {
        this.page = newPage;
        this.initSelectors();
    }

}

export default DashboardPage;