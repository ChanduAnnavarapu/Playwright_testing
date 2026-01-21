import {expect,test} from "playwright/test";

test("verify the URL",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    let pageURL:string=await page.url();
    console.log(pageURL);

    await expect(page).toHaveURL("https://testautomationpractice.blogspot.com/");
})