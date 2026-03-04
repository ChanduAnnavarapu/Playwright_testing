/*
1. create a booking
2.get the with booking id created from step 1
3. create a token
4. update the booking with the token and booking id
5. delete the booking with the token and booking id
6. get the booking with the booking id and verify that it is deleted
*/

import {test,expect} from '@playwright/test';
import fs from 'fs';

function readJson(filePath:string){
    return JSON.parse(fs.readFileSync(filePath,'utf-8'));
}

let bookingId:number;
let token:string;

test("Verify DELETE request: ",async({request})=>{
    //1. Create a new booking
    const createRequestBody = readJson("upload/createBooking.json");
    const createResponse = await request.post("/booking",{data:createRequestBody});

    const createResponseBody = await createResponse.json();
    console.log("Booking created successfully: ");
    console.log(createResponseBody);

    bookingId = createResponseBody.bookingid;
    console.log(`Booking ID ===> ${bookingId}`);

    //2. Get the booking with booking id created from step 1
    const getResponse = await request.get(`/booking/${bookingId}`);
    const getResponseBody = await getResponse.json();
    console.log("Get booking details successfully: ");
    console.log(getResponseBody);

    //3. Create a token 
    const tokenRequestBody = readJson("upload/createToken.json");    
    const tokenResponse = await request.post("/auth",{data:tokenRequestBody});
    const tokenResponseBody = await tokenResponse.json();
    console.log("Token created successfully: ");
    console.log(tokenResponseBody);
    token = tokenResponseBody.token;
    console.log(`Token ===> ${token}`);

    //4. Update the booking with the token and booking id
    const updateRequestBody = readJson("upload/updateBooking.json");
    const updateResponse = await request.put(`/booking/${bookingId}`,
        {
        headers:{"Cookie": `token=${token}`},
        data:updateRequestBody
        }
    );
    const updateResponseBody = await updateResponse.json();
    console.log("Booking updated successfully: ");
    console.log(updateResponseBody);

    //5. Delete the booking with the token and booking id
    const deleteResponse = await request.delete(`/booking/${bookingId}`,
        {
        headers:{"Cookie": `token=${token}`}
        }
    );
    console.log("Booking deleted successfully: ");
    expect(deleteResponse.statusText()).toBe("Created");
    expect(deleteResponse.status()).toBe(201);
});