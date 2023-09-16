import { check } from "k6";

export class BaseChecks {
    checkStatusCode(response, expectedStatus = 200){
        check(response , {
            'Status Code Check': (r) => r.status === expectedStatus
        })
    }

    checkResponseSize(response, size) {
        check(response, {
            "Response data size check": (r) => r.body.length <= size
        })
    }

    checkResponseTime(response, time) {
        check(response, {
            "Response time check": (r) => r.timings.duration < time
        })
    }

    checkResponseMessage(response, message) {
        check(response, {
            "Response body message check": (r) => r.json().message === message
        })
    }
}