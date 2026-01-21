import {test,expect,Locator} from "@playwright/test";

test("Verify the dynemic web tables: ",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    let allRows:Locator[]=await page.locator("#taskTable tbody tr").all();

    let chrome;
    for(let row of allRows){
        if(await row.locator('td').nth(0).innerText() === 'Chrome'){
            chrome=await row.locator('td:has-text("%")').innerText();
            console.log(chrome);
        }
    }

    let CPULoad_Chrome:string=await page.locator(".chrome-cpu").innerText();
    if(chrome?.includes(CPULoad_Chrome)){
        console.log("Chrome CPU Load is equal");
    }
    else{
        console.log("Chrome CPU Load is not equal");
    }

    expect(chrome).toContain(CPULoad_Chrome);

    await page.waitForTimeout(3000);
})