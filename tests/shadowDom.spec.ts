import {test, expect} from '@playwright/test';

test("Verify shadow DOM elements: ",async({page})=>{
    await page.goto("https://books-pwakit.appspot.com/");
    //for shadow dome element used CSS locator
    await page.locator("#input").fill("Playwright");
    await page.keyboard.press("Enter");
    //await page.waitForTimeout(5000); // Wait for search results to load
    let products=await page.locator("li book-item").all();
    console.log(`Total products found: ${products.length}`);
    expect(products.length).toBeGreaterThan(0);
})