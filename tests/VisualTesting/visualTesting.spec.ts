import {test,expect} from '@playwright/test';
test("Visual testing: ",async({page})=>{
    await page.goto("https://demowebshop.tricentis.com");

    //approach1-recommended
    expect(await page.screenshot()).toMatchSnapshot("homepage.png");

    //approach2
   // await expect(page).toHaveScreenshot();

    //capturing specific locator
    const logo=page.locator("img[alt='Tricentis Demo Web Shop']");
    expect(await logo.screenshot()).toMatchSnapshot("logo.png");

})