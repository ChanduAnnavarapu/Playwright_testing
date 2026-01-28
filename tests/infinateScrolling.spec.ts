import {test,expect,Locator} from "@playwright/test";

test("infinate scrolling: ",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    await page.evaluate(()=>{
     window.scrollTo(0,document.body.scrollHeight);
    });
    
    await page.waitForTimeout(5000);
});

test.only("infinate scrolling for books: ",async({page})=>{
    test.slow()
    await page.goto("https://www.booksbykilo.in/new-books/children-books?pricerange=0to100");
    let previousHeight:number=0;
    let foundBook=false;

    while(true){

    await page.waitForTimeout(2000);
    let booktitles=await page.locator(".category_page h3").allTextContents();

    if(booktitles?.includes("The Snowman")){
        foundBook=true;
        console.log("The Snowman is found");
        break;
    }   

    await page.evaluate(()=>{
     window.scrollTo(0,document.body.scrollHeight);
    });

    let currentHeight=await page.evaluate(()=>{
     return document.body.scrollHeight;
    });

    if(currentHeight===previousHeight){
        break;
    }
    console.log(`Current Height: ${currentHeight} , Previous Height: ${previousHeight}`);
    previousHeight=currentHeight;
    
    await page.waitForTimeout(5000);
    }

    if(foundBook==false){
        console.log("The snowman is not found");
    };
});