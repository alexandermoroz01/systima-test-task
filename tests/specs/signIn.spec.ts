import { test, expect, acct } from 'tests/fixtures';

test.describe.configure({ mode: 'parallel' })

test.describe('Sign In', () => {

    test.beforeEach(async ({ pages }) => {
        await pages[0].goto('/login');
    });

    test('Successful Login', async ({ 
        pages,
        loginPage,
        dashboardPage
    }) => {
        await test.step(
            'Enter username: joachim+453459@systima.no - ' + 
            `Enter password: 123456789 - ` +
            `Click login button - ` +
            `User should be redirected to dashboard`, async () => {
                await loginPage.login({username: acct.test_user.username, password: acct.test_user.password});
                await expect(pages[0]).toHaveURL(dashboardPage.endpoint);
        });
    });
  
    test('Failed Login', async ({ 
        pages,
        loginPage,
        dashboardPage
    }) => {
        await test.step(                
            'Enter invalid credentials - ' + 
            `Click login button - ` +
            `Error message should be displayed`, async () => {
                await loginPage.login({username: "test@test.com", password: "test"});
                await expect(loginPage.alertMsg).toBeVisible();
                await expect(loginPage.alertMsg).toHaveText("Feil brukernavn / passord");
                await expect(pages[0]).not.toHaveURL(dashboardPage.endpoint);
        });
    });
});