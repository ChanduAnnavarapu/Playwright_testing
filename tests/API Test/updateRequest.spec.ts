import {test, expect} from '@playwright/test';

function readJson(filePath:string){
    return JSON.parse(require('fs').readFileSync(filePath,'utf-8'));
}

let bookingId:number;
let token:string;

test("create a new booking: ",async({request})=>{
    const createRequestBody = readJson("upload/createBooking.json");
    const createResponse = await request.post("/booking",{data:createRequestBody});

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

    const updateRequestBody = readJson("upload/updateBooking.json");
    const updateResponse = await request.put(`/booking/${bookingId}`,
        {
        headers:{"Cookie": `token=${token}`},
        data:updateRequestBody
        }
    );
    const updateResponseBody = await updateResponse.json();
    console.log(updateResponseBody);
});