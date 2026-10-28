import {expect, test } from '@playwright/test';
import tags from '../test-data/mocks/conduitTags.json' with { type: 'json' };

test('APIMocking101', async ({ page }) => {

    // This method waits for the API call to be triggered and then it can modify the response
    // The '**/* format allow for any baseURL that ends with /api/tags to trigger the interception
    await page.route('**/*/api/tags', async route => {

        // Here the response's body is replaced with the new JSON
        // pulled from the imported test data file
        await route.fulfill({
            body: JSON.stringify(tags)
        })
    })

    // Going to this URL will trigger the API call intercepted above
    await page.goto('https://conduit.bondaracademy.com/');
    await expect(page.locator('div[class="tag-list"]')).toContainText('REPLACED TAG 2');
})

test('APIMocking101: GRANULAR interception', async ({ page }) => {

    await page.route('**/*/api/tags', async route => {
        // With this filter only the GET requests done to this URL are being intercepted
        if (route.request().method().includes('GET')) {
            await route.fulfill({
                body: JSON.stringify(tags)
            })
        } else {
            await route.continue();
        }
    })

    await page.goto('https://conduit.bondaracademy.com/');
    await expect(page.locator('div[class="tag-list"]')).toContainText('REPLACED TAG 2');
})