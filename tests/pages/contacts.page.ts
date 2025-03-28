import BasePage from '@pages/base.page';
import { Locator, Page, TestInfo, expect, test } from '@playwright/test';

class ContactPage extends BasePage {
    public endpoint = 'systimaas7/contacts';
    //locators
    public nyKontaktBtn: Locator;
    public opprettKontaktBtn: Locator;
    public navnInput: Locator;
    public popupMsg: Locator;
    public sokInput: Locator;
    public leverandorInput: Locator;


    constructor(page: Page, testInfo: TestInfo) {
        super(page, testInfo);
        this.initSelectors()
    }

    private initSelectors() {
        this.nyKontaktBtn = this.page.locator(`//button//span[text()='Ny kontakt ']`);
        this.opprettKontaktBtn = this.page.locator(`//button[@type="submit"]//span[normalize-space()='Opprett kontakt']`);
        this.navnInput = this.page.locator(`//label[text()='Navn *']//..//input`);
        this.popupMsg = this.page.locator('//div[@class="snackbar-container"]');
        this.sokInput = this.page.locator(`//label[text()='Søk']//..//input`);
        this.leverandorInput = this.page.locator(`//label[text()='Leverandørnr. *']//..//input`);
    }

    public updatePage(newPage: Page) {
        this.page = newPage;
        this.initSelectors();
    }

    errorLabelByText(text: string){
        return this.page.locator(`//div[@class="v-messages theme--light error--text" and @role="alert"]//div[@class="v-messages__message" and text()='${text}']`);
    }

    navnByText(text: string){
        return this.page.locator(`//tbody//tr//td[2]//span[text()='${text}']`);
    }

}

export default ContactPage;