import { register } from "node:module";
import {test,expect,Locator} from "playwright/test";

/*test("verify the getByAltTest",async({page})=>{
    await page.goto("https://demo.nopcommerce.com/");

    let title:Locator= page.getByAltText("nopCommerce demo store");

    //await expect(page).toHaveTitle("Online Shopping India Mobile, Cameras, Lifestyle & more Online @ Flipkart.com");
    await expect(title).toBeVisible();
});

test("verify the getByText()",async({page})=>{
    await page.goto("https://demo.nopcommerce.com/");

    let text:Locator= page.getByText("Welcome to our store");
    await expect(text).toBeVisible();
});*/

test("verify the getByRole()",async({page})=>{
    await page.goto("https://demo.nopcommerce.com/");

    await page.getByRole("link",{name:'Log in'}).click();
    //let role:Locator=page.getByRole("heading",{name:'Register'});
    await expect(page.getByRole("heading",{name:'Welcome, Please Sign In!'})).toBeVisible();
});

