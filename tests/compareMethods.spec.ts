import {test,expect,Locator} from "@playwright/test";

test("verify the compare methods: ",async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/");
    const productLocators:Locator[]=await page.locator("//h2/a[contains(text(),'computer')]").all();
    //const productLocators:Locator[]=await page.locator(".product-title").all();

    /*console.log(`innerText(): `,await productLocators.nth(1).innerText());
    console.log(`textContent(): `,await productLocators.nth(1).textContent());

    console.log(`allInnerText(): `,await productLocators.allInnerTexts());
    console.log(`allTextContents(): `,await productLocators.allTextContents());*/

    for(let product of productLocators){
        console.log(await product.innerText());
    }

    for(let product of productLocators){
        let productName=await product.textContent();
        console.log(productName?.trim());
    }

    console.log("product locators in the array")
    for(let i=0;i<productLocators.length;i++){
        console.log(await productLocators[i].innerText());
    }
});