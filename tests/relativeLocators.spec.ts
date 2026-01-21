import {test,expect,Locator} from "@playwright/test";

test("validating the relative xpath locators: ",async({page})=>{
    await page.goto("https://www.w3schools.com/html/html_tables.asp");

    //self
    const text:Locator=page.locator("//td[text()='Maria Anders']/self::td");
    await expect(text).toHaveText("Maria Anders");

    //parent
    const parentLocator:Locator=page.locator("//td[text()='Maria Anders']/parent::tr");
    await expect(parentLocator).toContainText("Alfreds Futterkiste");

    //child
    const childLocator:Locator=page.locator("//table[@id='customers']//tr[1]/child::*");
    await expect(childLocator).toHaveCount(3);

    //ancestor
    const ancestorList:Locator=page.locator("//table[@id='customers']//tr[1]/ancestor::table");
    console.log(await ancestorList.allTextContents());

     //descendents
    const descendentsList:Locator=page.locator("//table[@id='customers']//tr[1]/decendent::table");
    console.log(await descendentsList.allTextContents());

})