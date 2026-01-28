import {test,expect,Locator} from "@playwright/test";

test("mouse actions: hover",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    
    //hover action
    await page.locator(".dropbtn").hover();
    await page.locator(".dropdown-content a:has-text('Laptops')").hover();
    await page.waitForTimeout(5000);

});

test("mouse actions: rightclick",async({page})=>{
    await page.goto("https://swisnl.github.io/jQuery-contextMenu/demo.html");
    
    //rightclick action
    await page.locator(".context-menu-one.btn.btn-neutral").click({button:"right"});
    await page.waitForTimeout(2000);
    await page.locator(".context-menu-icon-copy").click();
    await page.waitForTimeout(5000);

})

test("mouse actions: doubleclick",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    
    const copyMeg=await page.locator("#field1").innerText();
    await page.locator("[ondblclick='myFunction1()']").dblclick();
    expect(await page.locator("#field2").innerText()).toBe(copyMeg);
    await page.waitForTimeout(5000);

})

test.only("mouse actions: drag and drop",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    
    //drag and drop action
    const childBox=page.locator("#draggable");
    const parentBox=page.locator("#droppable");
    //Approach1
    await childBox.dragTo(parentBox);

    //Approach2
    /*await childBox.hover();
    await page.mouse.down();
    await parentBox.hover();
    await page.mouse.up();
    await page.waitForTimeout(5000);*/
})