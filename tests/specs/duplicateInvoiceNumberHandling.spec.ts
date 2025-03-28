import { test, expect, acct } from 'tests/fixtures';
import moment from "moment";

test.describe.configure({ mode: 'parallel' })

const invoiceData = {
    contact: "Systima AS",
    amount: "100",
    invoiceDate: "01.01.2024",
    dueDate: "15.01.2024",
    invoiceNumber: "1",
    account: "1000 Utvikling, ervervet"
};

test.describe('Duplicate Invoice Number Handling', () => {

    test.beforeEach(async ({ pages, loginPage }) => {
        await pages[0].goto('/login');
        await loginPage.login({username: acct.test_user.username, password: acct.test_user.password});
    });

    test('Duplicate Invoice Number Handling', async ({ 
        pages,
        dashboardPage,
        basePage
    }) => {
        await test.step('Menu -> Bokføring -> Bokfør andre filer', async () => {
            await basePage.click(dashboardPage.bokforingBtn);
            await basePage.click(dashboardPage.bokforAndreFilerBtn);
            await expect(pages[0]).toHaveURL(/\/purchase/);
        });

        await test.step(
            'Contact: Select "Systima AS" from "Kontakt (Valgfri ved kvittering)" - ' + 
            'Amount: Enter "100" in "Totalt beløp inkl. mva*" - ' + 
            'Invoice Date: Enter "01.01.2024" in "Fakturadato *" - ' + 
            'Due Date: Enter "15.01.2024" in "Forfallsdato" - ' + 
            'Invoice Number: Enter "1" - ' + 
            'Account: Select "1000 Utvikling, ervervet" in "Konto *" - ', async () => {
                await dashboardPage.selectKontaktDropdown(invoiceData.contact);
                await basePage.fill(dashboardPage.totaltBelopInklMvaInput, invoiceData.amount);
                await basePage.fill(dashboardPage.facturadatoInput, String(moment(invoiceData.invoiceDate, 'DD.MM.YYYY').add(1, 'd').format('DD.MM.YYYY')));
                await basePage.fill(dashboardPage.fortallsdatoInput, String(moment(invoiceData.dueDate, 'DD.MM.YYYY').add(1, 'd').format('DD.MM.YYYY')));
                await basePage.fill(dashboardPage.fakturanrInput, invoiceData.invoiceNumber)
                await dashboardPage.selectKontoDropdown(invoiceData.account);
        });

        await test.step(
            'Click "Bokfør" button - ' +
            'Red validation error under "Fakturanr." field - ' +
            'Error message: "Fakturanr. er allerede bokført [vouchernb]" - ' +
            'Form should not be cleared', async () => {
                await basePage.click(dashboardPage.bokforBtn);
                await expect.soft(dashboardPage.errorLabelByText('Fakturanr. er allerede bokført')).toBeVisible();

                await expect.soft(dashboardPage.kontaktInput).toHaveText(invoiceData.contact);
                await expect.soft(dashboardPage.totaltBelopInklMvaInput).toHaveValue(invoiceData.amount);
                await expect.soft(dashboardPage.facturadatoInput).toHaveValue(invoiceData.invoiceDate);
                await expect.soft(dashboardPage.fortallsdatoInput).toHaveValue(invoiceData.dueDate);
                await expect.soft(dashboardPage.fakturanrInput).toHaveValue(invoiceData.invoiceNumber);
                await expect(dashboardPage.kontoInput).toHaveText(invoiceData.account);
        });
    });
});