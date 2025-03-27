import { test as base, BrowserContext, Page } from '@playwright/test';
import TestPage from '@pages/test.page';
import TabChanger from './helpers/tabChanger';

import * as fs from 'fs';

const accountsData = fs.readFileSync('./environment/accounts.json', 'utf-8');
const acct = JSON.parse(accountsData);


export const test = base.extend<{
    pages: Page[];
    config: any;

    context: BrowserContext;
    tabChanger: TabChanger;
    testPage: TestPage;
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

    tabChanger: async ({ pages, testPage}, use, testInfo) => {
        await use(new TabChanger(pages[0], testInfo, testPage));
    },
    testPage: async ({ pages }, use, testInfo) => {
        await use(new TestPage(pages[0], testInfo));
    },
});

export { acct };
export { expect } from '@playwright/test';
