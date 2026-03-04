import {test,expect} from '@playwright/test';

test("Verify GET request with path parameters: ",async({request})=>{
    const QueryParams = 1;
    const response = await request.get(`/booking/${QueryParams}`);

const responseBody = await response.json();
console.log(responseBody);

expect(response.status()).toBe(200);
expect(responseBody).toHaveProperty("firstname");
expect(responseBody).toHaveProperty("lastname");
expect(responseBody).toHaveProperty("totalprice");
expect(responseBody).toHaveProperty("depositpaid");
expect(responseBody).toHaveProperty("bookingdates");
expect(responseBody).toHaveProperty("additionalneeds"); 
expect(responseBody.bookingdates).toHaveProperty("checkin");
expect(responseBody.bookingdates).toHaveProperty("checkout");
});

test.only("Verify GET request with query parameters: ",async({request})=>{
    const firstName = "Jim";
    const lastName = "Brown";
    const response = await request.get("/booking",{params:{firstName,lastName}});

const responseBody = await response.json();
console.log(responseBody);
expect(response.status()).toBe(200);
});