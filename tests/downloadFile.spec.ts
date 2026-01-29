import {test, expect} from '@playwright/test';
import fs from 'fs';

test('download txt file: ', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/p/download-files_25.html');
    await page.locator("#inputText").fill("Playwright Test");
    await page.locator("#generateTxt").click();
    const [ download ] = await Promise.all([
        page.waitForEvent('download'),
        page.locator("#txtDownloadLink").click()
    ]);

    let downloadPath = "download/sample.txt";
    //save the file to custome path
    await download.saveAs(downloadPath);

    //verify the downloaded file available in path
    const fileExists = fs.existsSync(downloadPath);
    expect(fileExists).toBeTruthy();

    //clean up - delete the downloaded file
    if(fileExists){
        fs.unlinkSync(downloadPath);
    }

    await page.waitForTimeout(3000);
});


test.only('download pdf file: ', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/p/download-files_25.html');
    await page.locator("#inputText").fill("Playwright Test");
    await page.locator("#generatePdf").click();
    const [ download ] = await Promise.all([
        page.waitForEvent('download'),
        page.locator("#pdfDownloadLink").click()
    ]);

    let downloadPath = "download/sample.pdf";
    //save the file to custome path
    await download.saveAs(downloadPath);

    //verify the downloaded file available in path
    const fileExists = fs.existsSync(downloadPath);
    expect(fileExists).toBeTruthy();

    //clean up - delete the downloaded file
    if(fileExists){
        fs.unlinkSync(downloadPath);
    }

    await page.waitForTimeout(3000);
});