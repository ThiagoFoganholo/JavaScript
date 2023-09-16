export const testeConfig = {

    environments: {
        hml: {
            url: "http://localhost:3000"
        }
    },
    options: {
        SmokeThresholds: {
            vus: 1, // Key for Smoke test. Keep it at 2, 3, max 5 VUs
            duration: '1s', // This can be shorter or just a few iterations
            thresholds: {
                http_req_duration: ['p(95) < 2000'],
                http_req_failed : ['rate < 0.01']
            }
        },

        LoadThresholds: {
            vus: 50, // Key for Smoke test. Keep it at 2, 3, max 5 VUs
            duration: '5s', // This can be shorter or just a few iterations
            thresholds: {
                http_req_duration: ['p(95) < 2000'],
                http_req_failed : ['rate < 0.01']
            }
        },
        
        Stresshresholds: {
            vus: 500, // Key for Smoke test. Keep it at 2, 3, max 5 VUs
            duration: '20s', // This can be shorter or just a few iterations

            thresholds: {
                http_req_duration: ['p(95) < 2000'],
                http_req_failed : ['rate < 0.01']
            }
        },
    }
}