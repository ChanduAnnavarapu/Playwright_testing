import {test,expect,Locator} from "@playwright/test";

test("verify the no of records: ",async({page})=>{
    await page.goto("https://datatables.net/");
    let rows:Locator[]=await page.locator("#example tbody tr").all();

    let hasNextPage=true;
    while(hasNextPage){
    for(let row of rows){
        let rowcontent:string[]=await row.locator("td").allTextContents();
        console.log(rowcontent.join('||'));
    }

    hasNextPage=await page.locator("button[aria-label='Next']").isEnabled();
    if(hasNextPage===true){
        await page.locator("button[aria-label='Next']").click();
    }
    }
})

test.only("verify the no of new york records: ",async({page})=>{
    await page.goto("https://datatables.net/");
    let element=await page.locator("#dt-search-0").fill("new york");
    let rows:Locator[]=await page.locator("#example tbody tr").all();
    let sum=0;
    let hasNextPage=true;
    if(rows.length>0){
        while(hasNextPage){
        for(let row of rows){
            let rowcontent:string[]=await row.locator("td").allTextContents();
            console.log(rowcontent.join('||'));
            sum=sum+1;
        }

        hasNextPage=await page.locator("button[aria-label='Next']").isEnabled();
        if(hasNextPage===true){
            await page.locator("button[aria-label='Next']").click();
        }
        }
        console.log("total no.of rows in new york: ",sum);
    }
    else{
        console.log("no matching records")
    }
})