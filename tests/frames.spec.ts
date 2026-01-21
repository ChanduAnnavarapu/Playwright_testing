import {test,expect,Locator} from "@playwright/test";

test("verify the frames: ",async({page})=>{
    await page.goto("https://ui.vision/demo/webtest/frames/");
    let frames=page.frames();
    console.log(`no of frames: ${frames.length}`);
    let frame1=page.frame({url:"https://ui.vision/demo/webtest/frames/frame_1.html"});
    //let frame1=page.frame("[src='frame_1.html']");
    if(frame1){
    //await frame1.locator("[name='mytext1']").fill("pavan");
    await frame1.fill("[name='mytext1']","pavan");
    await page.waitForTimeout(3000);
    }
    else{
        console.log("The frame is invalid");
    }
})