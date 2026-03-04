import {test, expect} from '@playwright/test';
import Ajv from "ajv";

test("Validate the Json schema of the response", async ({request}) => {
    const response = await request.get("https://mocktarget.apigee.net/json");
    expect(response.status()).toBe(200);

    const schema = {
        type: "object",
        properties: {
            firstName: {type: "string"},
            lastName: {type: "string"},
            city: {type: "string"},
            state: {type: "string"}
        },
        required: ["firstName", "lastName", "city", "state"]
    };

    const ajv = new Ajv();
    const validate = ajv.compile(schema);
    const responseBody = await response.json();
    const valid = validate(responseBody);
    expect(valid).toBe(true);
});