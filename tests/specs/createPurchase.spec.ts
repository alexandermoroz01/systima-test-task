import { test, expect, acct } from 'tests/fixtures';

test.describe.configure({ mode: 'parallel' })

test.describe('Create Purchase', () => {

    test.beforeEach(async ({ pages, loginPage }) => {
        await pages[0].goto('/login');
        await loginPage.login({username: acct.test_user.username, password: acct.test_user.password});
    });

    test('Create Purchase', async ({ 
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
            'Contact: Select "Systima AS" from "Kontakt (Valgfri ved kvittering)" \n ' + 
            'Amount: Enter "100" in "Totalt beløp inkl. mva*" \n ' + 
            'Invoice Date: Enter "01.01.2024" in "Fakturadato *" \n ' + 
            'Due Date: Enter "15.01.2024" in "Forfallsdato" \n ' + 
            'Account: Select "1000 Utvikling, ervervet" in "Konto *" \n ', async () => {
                await dashboardPage.selectKontaktDropdown("Systima AS");
                await basePage.fill(dashboardPage.totaltBelopInklMvaInput, 100);
                await basePage.fill(dashboardPage.facturadatoInput, "01.01.2024");
                await basePage.fill(dashboardPage.fortallsdatoInput, "15.01.2024");
                await dashboardPage.selectKontoDropdown("1000 Utvikling, ervervet");
        });

        await test.step(
            'Click "Bokfør" button - ' +
            'Green success message displays: "Bilag opprettet med bilagsnr. [vouchernb]" - ' +
            'Form should be cleared', async () => {
                await basePage.click(dashboardPage.bokforBtn);
                await expect.soft(dashboardPage.popupMsg).toBeVisible();
                await expect.soft(dashboardPage.popupMsg).toContainText("Bilag opprettet med bilagsnr.");
                await expect.soft(dashboardPage.kontaktInput).toBeEmpty();
                await expect.soft(dashboardPage.totaltBelopInklMvaInput).toBeEmpty();
                await expect.soft(dashboardPage.facturadatoInput).toBeEmpty();
                await expect.soft(dashboardPage.fortallsdatoInput).toBeEmpty();
                await expect(dashboardPage.kontoInput).toBeEmpty();
        });
    });
});