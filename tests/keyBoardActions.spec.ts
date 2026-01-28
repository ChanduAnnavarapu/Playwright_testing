/*
Key Board Actions:
insertText
down
press
type
up
*/

import { test, expect } from '@playwright/test';
test('keyboard actions: ', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');    

    const inputField =page.locator("#input1");

    //Approach 1: insertText
    await inputField.focus();
    await page.keyboard.insertText("Hello World ");

    //copy text
    /*await page.keyboard.down("Control");
    await page.keyboard.press("KeyA");
    await page.keyboard.press("KeyC");
    await page.keyboard.up("Control");*/
    await page.keyboard.press("Control+A");
    await page.keyboard.press("Control+C");

    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");

    await page.keyboard.press("Control+V");
    await page.waitForTimeout(5000);

});