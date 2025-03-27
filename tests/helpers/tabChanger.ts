import BasePage from '@pages/base.page';
import { Page, TestInfo } from '@playwright/test';
import TestPage from '@pages/test.page';
import LoginPage from '@pages/login.page';
import DashboardPage from '@pages/dashboard.page';
class TabChanger extends BasePage {

    private testPage: TestPage;
    private loginPage: LoginPage;
    private dashboardPage: DashboardPage;
    
    constructor(
        page: Page,
        testInfo: TestInfo,
        testPage: TestPage,
        loginPage: LoginPage,
        dashboardPage: DashboardPage,
    ) {
        super(page, testInfo);
        this.testPage = testPage;
        this.loginPage = loginPage;
        this.dashboardPage = dashboardPage;
    }

    public updatePage(newPage: Page) {
        this.testPage.updatePage(newPage);
        this.loginPage.updatePage(newPage);
        this.dashboardPage.updatePage(newPage);
        newPage.bringToFront();
    }
}
export default TabChanger;