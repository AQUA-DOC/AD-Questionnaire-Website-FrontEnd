import axios from 'axios';

// Uncommend for local testing
// const http = axios.create({
//     baseURL: "http://localhost:3000/backend",
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//     }
// });

// Uncomment for Production
const http = axios.create({
    baseURL: "https://aquadocinc.org/backend",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});



// Submit a report-request
async function submitReportRequest(data) {
    return http.post("/submit/report-request", data)
        .then(response => {
            console.log("SubmitResponse")
            console.log(response.status)
        if (response.status !== 200) {
            throw new Error(`Unexpected status: ${response.status}`);
        }
        return response.status;
        });
}






export {
    submitReportRequest
}