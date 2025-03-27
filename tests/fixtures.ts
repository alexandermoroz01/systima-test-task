import { test as base, BrowserContext, Page } from '@playwright/test';
import TabChanger from './helpers/tabChanger';

import BasePage from '@pages/base.page';
import TestPage from '@pages/test.page';
import LoginPage from '@pages/login.page';
import DashboardPage from '@pages/dashboard.page';

import * as fs from 'fs';

const accountsData = fs.readFileSync('./environment/accounts.json', 'utf-8');
const acct = JSON.parse(accountsData);

export const test = base.extend<{
    pages: Page[];
    config: any;

    context: BrowserContext;
    basePage: BasePage;
    tabChanger: TabChanger;
    testPage: TestPage;
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
}>({
    context: async ({ browser }, use) => {
        const context = await browser.newContext({ timezoneId: 'America/New_York' });
        await use(context);
        await context.close();
    },
    pages: async ({ context }, use) => {
        const initialPage = await context.newPage();
        const pages = [initialPage];
        await use(pages);
        await Promise.all(pages.map(page => page.close()));
    },
    basePage: async ({ pages }, use, testInfo) => {
        await use(new BasePage(pages[0], testInfo));
    },
    tabChanger: async ({ pages, testPage, loginPage, dashboardPage}, use, testInfo) => {
        await use(new TabChanger(pages[0], testInfo, testPage, loginPage, dashboardPage));
    },
    testPage: async ({ pages }, use, testInfo) => {
        await use(new TestPage(pages[0], testInfo));
    },
    loginPage: async ({ pages }, use, testInfo) => {
        await use(new LoginPage(pages[0], testInfo));
    },
    dashboardPage: async ({ pages }, use, testInfo) => {
        await use(new DashboardPage(pages[0], testInfo));
    },
});

export { acct };
export { expect } from '@playwright/test';
