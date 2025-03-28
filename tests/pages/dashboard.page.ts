import BasePage from '@pages/base.page';
import { Locator, Page, TestInfo, expect, test } from '@playwright/test';

class DashboardPage extends BasePage {
    public endpoint = 'systimaas7/dashboard';
    //locators
    public bokforingBtn: Locator;
    public bokforAndreFilerBtn: Locator;
    public kontaktInput: Locator;
    public sokInput: Locator;
    public totaltBelopInklMvaInput: Locator;
    public facturadatoInput: Locator;
    public fortallsdatoInput: Locator;
    public kontoInput: Locator;
    public bokforBtn: Locator;
    public popupMsg: Locator;



    constructor(page: Page, testInfo: TestInfo) {
        super(page, testInfo);
        this.initSelectors()
    }

    private initSelectors() {
        this.bokforingBtn = this.page.locator(`//div[@class="v-list-item__title" and text()='Bokføring']//..//..//..//div[@role="button"]`);
        this.bokforAndreFilerBtn = this.page.locator(`//div[@class="v-list-item__content"]//div[text()='Bokfør andre filer']`);
        this.kontaktInput = this.page.locator(`//input[@data-testid="contact-select"]//..//..//div[@class="v-select__selections"]`);
        this.sokInput = this.page.locator(`//div[contains(@class,'menuable__content__active')]//label[text()='Søk']//..//input`);
        this.totaltBelopInklMvaInput = this.page.locator(`//label[text()='Totalt beløp inkl. mva. *']//..//input`);
        this.facturadatoInput = this.page.locator(`//label[text()='Fakturadato *']//..//input`);
        this.fortallsdatoInput = this.page.locator(`//label[text()='Forfallsdato']//..//input`);
        this.kontoInput = this.page.locator(`//input[@data-testid="account-select"]//..//..//div[@class="v-select__selections"]`);
        this.bokforBtn = this.page.locator(`//span[normalize-space()='Bokfør']`);
        this.popupMsg = this.page.locator('//div[@class="snackbar-container"]');
    }

    public updatePage(newPage: Page) {
        this.page = newPage;
        this.initSelectors();
    }

    async selectKontaktDropdown(text: string){
        await this.click(this.kontaktInput);
        await this.fill(this.sokInput, text);
        await this.clickEnterKey();
    }

    async selectKontoDropdown(text: string){
        await this.click(this.kontoInput);
        await this.fill(this.sokInput, text);
        await this.clickEnterKey();
    }

}

export default DashboardPage;