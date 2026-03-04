/*
test: create booking
request type: post
request body: static
*/
import {test,expect} from '@playwright/test';
import * as fs from 'fs';

test("Verify POST request and response: ",async({request})=>{
//request body to be sent in the POST request from json file
const jsonPath="upload/requestBody.json";
const requestBodyData: any[] = JSON.parse(fs.readFileSync(jsonPath,"utf-8"));
   
for(let requestBody of requestBodyData){
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
}

});