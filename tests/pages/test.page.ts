import BasePage from '@pages/base.page';
import { Locator, Page, TestInfo, expect, test } from '@playwright/test';

class TestPage extends BasePage {
    //locators
    public googleInboxBtn: Locator;

    constructor(page: Page, testInfo: TestInfo) {
        super(page, testInfo);
        this.initSelectors()
    }

    private initSelectors() {
        this.googleInboxBtn = this.page.locator(`//header[@role="banner"]//img[@role="presentation"]`);
    }

    public updatePage(newPage: Page) {
        this.page = newPage;
        this.initSelectors();
    }



}

export default TestPage;