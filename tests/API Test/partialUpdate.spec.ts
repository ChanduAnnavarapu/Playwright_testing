import {test, expect} from '@playwright/test';

function readJson(filePath:string){
    return JSON.parse(require('fs').readFileSync(filePath,'utf-8'));
}

let bookingId:number;
let token:string;

test("update a booking(patch): ",async({request})=>{
    const CreateRequestBody = readJson("upload/createBooking.json");
    const createResponse = await request.post("/booking",{data:CreateRequestBody});

    const createResponseBody = await createResponse.json();
    console.log(createResponseBody);

    bookingId = createResponseBody.bookingid;
    console.log(`Booking ID ===> ${bookingId}`);

    const tokenRequestBody = readJson("upload/createToken.json");    
    const tokenResponse = await request.post("/auth",{data:tokenRequestBody});

    const tokenResponseBody = await tokenResponse.json();
    console.log(tokenResponseBody);
    token = tokenResponseBody.token;
    console.log(`Token ===> ${token}`);

    const updateRequestBody = readJson("upload/partialUpdateBooking.json");
    const response = await request.patch(`/booking/${bookingId}`,
        {
        headers:{"Cookie": `token=${token}`},
        data:updateRequestBody
        }
    );
    const responseBody = await response.json();
    console.log(responseBody);
});