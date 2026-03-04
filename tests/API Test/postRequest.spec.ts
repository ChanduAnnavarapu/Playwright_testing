/*
test: create booking
request type: post
request body: static
*/
import {test,expect} from '@playwright/test';

test("Verify POST request and response: ",async({request})=>{

    //request body to be sent in the POST request
    const requestBody={
    "firstname" : "Jim",
    "lastname" : "Brown",
    "totalprice" : 111,
    "depositpaid" : true,
    "bookingdates" : {
        "checkin" : "2018-01-01",
        "checkout" : "2019-01-01"
    },
    "additionalneeds" : "Breakfast"
    }

//sent post request to the API endpoint and stored the response in a variable
const response = await request.post("https://restful-booker.herokuapp.com/booking",{data:requestBody});

const responseBody = await response.json(); 
console.log(responseBody);

//validating the response status code and response body
expect(response.status()).toBe(200);
expect(responseBody).toHaveProperty("bookingid");
expect(responseBody).toHaveProperty("booking");

//validating the nested body of response
expect(responseBody.booking).toMatchObject(
    {
        "firstname": "Jim",
        "lastname": "Brown",
        "totalprice": 111,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2018-01-01",
            "checkout": "2019-01-01"
        },
        "additionalneeds": "Breakfast"
    }
);



});