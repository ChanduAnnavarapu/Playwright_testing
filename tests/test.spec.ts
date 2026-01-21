import {expect,test} from "playwright/test";

test("verify the title",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    let pageTitle:string=await page.title();
    console.log(pageTitle);

    await expect(page).toHaveTitle("Automation Testing Practice");
})