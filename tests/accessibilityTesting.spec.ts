import {test, expect} from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';
test("Accessibility testing: ",async({page},testInfo)=>{

    //await page.goto("https://demowebshop.tricentis.com/");
    await page.goto("https://akriviahcm.com/");

    //1.capturing all violations
    /*const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    //console.log(accessibilityScanResults.violations);
    console.dir(accessibilityScanResults, { depth: null });
    expect(accessibilityScanResults.violations.length).toBe(0);*/

    //2 capturing specific violation
    //const accessibilityScanResults1 = await new AxeBuilder({ page }).withTags(["wcag2.1aa","wcag2aa"]).analyze();

    //3. capturing specific violation by specific rule
    //const accessibilityScanResults1 = await new AxeBuilder({ page }).withRules(["duplicate-id"]).analyze();

    //4. capturing specific violation by disabling specific rule
    const accessibilityScanResults1 = await new AxeBuilder({ page }).disableRules(["duplicate-id"]).analyze();

    await testInfo.attach("accessibilityScanResults1", {
        body: JSON.stringify(accessibilityScanResults1, null, 2),
        contentType: "application/json"
    });
    //console.dir(accessibilityScanResults1, { depth: null });
    expect(accessibilityScanResults1.violations.length).toBe(0);

});