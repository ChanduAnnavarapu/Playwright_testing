/*
test: create booking
request type: post
request body: faker
npm install @faker-js/faker -- for generating random data
npm install luxon -- for the date and time manipulation
*/
import {test,expect} from '@playwright/test';
import { faker } from '@faker-js/faker';
import { DateTime } from 'luxon';

test("Verify POST request and response: ",async({request})=>{
    //request body to be sent in the POST request
    const requestBody={
    "firstname" : faker.person.firstName(),
    "lastname" : faker.person.lastName(),
    "totalprice" : faker.number.int({min:1000, max:5000}),
    "depositpaid" : faker.datatype.boolean(),
    "bookingdates" : {
        "checkin" : DateTime.now().toFormat("yyyy-MM-dd"),
        "checkout" : DateTime.now().plus({days:5}).toFormat("yyyy-MM-dd")
    },
    "additionalneeds" : faker.helpers.arrayElement(["Breakfast","Lunch","Dinner","Snacks"])
    }

//sent post request to the API endpoint and stored the response in a variable
const response = await request.post("/booking",{data:requestBody});

const responseBody = await response.json(); 
console.log(responseBody);

//validating the response status code and response body
expect(response.status()).toBe(200);
expect(responseBody).toHaveProperty("bookingid");
expect(responseBody).toHaveProperty("booking");

//validating the nested body of response
expect(responseBody.booking).toMatchObject(
    {
        "firstname": requestBody.firstname,
        "lastname": requestBody.lastname,
        "totalprice": requestBody.totalprice,
        "depositpaid": requestBody.depositpaid,
        "bookingdates": {
            "checkin": requestBody.bookingdates.checkin,
            "checkout": requestBody.bookingdates.checkout
        },
        "additionalneeds": requestBody.additionalneeds
    }
);

});