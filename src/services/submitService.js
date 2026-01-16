import axios from 'axios';

// const http = axios.create({
//     baseURL: "http://localhost:3000",
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//     }
// });

const http = axios.create({
    baseURL: "https://aquadocinc.org/backend",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

/* Returns All Pages */
// async function getAllPageContent() {
//     return http.get('/content')
//             .then(response => {
//                 if (response.data.status !== 200) {
//                     console.log("Error encountered in getAllPageContent");
//                     return;
//                 } else {
//                     return response.data.message;
//                 }
//             });
// }


// This is the one I'll use - above are examples.
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

// async function submitReportRequest(data) {
//     let response = {
//         "status": 200
//     }
//     console.log(data)
//     console.log("submit service here")
//     return response;
// }




export {
    submitReportRequest
}