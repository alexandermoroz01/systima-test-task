import BasePage from '@pages/base.page';
import { Page, TestInfo } from '@playwright/test';
import TestPage from '@pages/test.page';
class TabChanger extends BasePage {

    private testPage: TestPage;

    constructor(
        page: Page,
        testInfo: TestInfo,
        testPage: TestPage,
    ) {
        super(page, testInfo);
        this.testPage = testPage;
    }

    public updatePage(newPage: Page) {
        this.testPage.updatePage(newPage);
        newPage.bringToFront();
    }
}
export default TabChanger;