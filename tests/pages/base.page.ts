import { Locator, Page, TestInfo } from '@playwright/test';

export default class BasePage {
    public page: Page;
    public testInfo: TestInfo;
    readonly defaultTimeout: number = 150000;


    constructor(page: Page, testInfo: TestInfo) {
        this.page = page;
        this.testInfo = testInfo;
    }

    async clickEnterKey(): Promise<void> {
        await this.page.keyboard.press('Enter');
    }

    async clickEscKey(): Promise<void> {
        await this.page.keyboard.press('Escape');
    }

    async click(locator: Locator, timeout: number = this.defaultTimeout): Promise<void> {
        await locator.click({timeout: timeout});
    }

    async fill(locator: Locator, value: any, timeout: number = this.defaultTimeout): Promise<void> {
        await locator.fill(String(value), {timeout: timeout});
    }

    async type(locator: Locator, value: any, timeout: number = this.defaultTimeout): Promise<void> {
        await locator.type(String(value), {delay: 150, timeout: timeout});
    }

    async clickTopLeftCorner() {
        await this.page.mouse.click(0, 0);
    }
}