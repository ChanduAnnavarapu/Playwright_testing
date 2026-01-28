import {test, expect} from "@playwright/test";

test('single file upload: ', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    await page.locator("#singleFileInput").setInputFiles("upload/test1.txt");
    await page.locator("button:has-text('Upload Single File')").click();
    let msg=await page.locator("#singleFileStatus").innerText();
    expect(msg).toContain("test1.txt");
});

test('multiple file upload: ', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    await page.locator("#multipleFilesInput").setInputFiles(["upload/test1.txt","upload/test2.txt"]);
    await page.locator("button:has-text('Upload Multiple Files')").click();
    let msg=await page.locator("#multipleFilesStatus").innerText();
    expect(msg).toContain("test1.txt");
    expect(msg).toContain("test2.txt");
});