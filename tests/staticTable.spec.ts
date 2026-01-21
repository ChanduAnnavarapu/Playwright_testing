import {test,expect,Locator} from "@playwright/test";

test("Varify the operations on static web tables: ",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    let rows:Locator=page.locator("table[name='BookTable'] tr");
    console.log(`rows count: ${await rows.count()}`);
    expect(await rows.count()).toBe(7);

    let columns:Locator=rows.locator("th");
    console.log(`columns count: ${await columns.count()}`);
    expect(await columns.count()).toBe(4);

    /*const secountRow:string[]=await rows.nth(2).locator('td').allInnerTexts();
    console.log(secountRow);

    for(let rowVal of secountRow){
        console.log(rowVal);
    }

    for(let i in secountRow){
        console.log(secountRow[i]);
    }

    console.log("Printing the entire table: ");
    let allRowData:Locator[]=await rows.all()

    for(let row of allRowData.slice(1)){
        let rowDetails:string[]=await row.locator('td').allInnerTexts();
        console.log(rowDetails.join('\t')); //console.log(rowDetails) - this will print individual arrays
    }*/

    //print book names based on author name
    let authorName='Amit';
    let allRowData:Locator[]=await rows.all();
    /*console.log("books of author");
    for(let row of allRowData.slice(1)){
        if(await row.locator('td').nth(1).textContent()===authorName){
            console.log(await row.locator('td').nth(0).innerText());
        }
    }*/

    //total price of all books
    console.log("total price of all books");
    let sum:number=0;
    for(let row of allRowData.slice(1)){
        sum=sum+Number(await row.locator('td').nth(3).innerText());
    }
    console.log("total price: ",sum);
})