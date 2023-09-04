import http from 'k6/http';
import { Trend,Rate,Counter,Gauge } from 'k6/metrics';
import { sleep } from 'k6';
import { check, fail } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const TrendRTT = new Trend('RTT');
export const RateContentOK = new Rate('Content OK');
export const GaugeContentSize = new Gauge('ContentSize');
export const CounterErrors = new Counter('Errors');

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  };
}

export const options = {

  stages:[

  // SMOKE
  
  //  { duration: '1s', target: 1 }, 

  // LOAD

  
  //  { duration: '5',   target: 100 }, 
  //  { duration: '10s', target: 100 }, 
  //  { duration: '5s',  target: 50 },

  // STRESS e SPIKE

  //  { duration: '5s', target: 100 }, 
  //  { duration: '5s', target: 100 }, 
  //  { duration: '5s', target: 50 },
  //  { duration: '2s', target: 1000 },
  //  { duration: '5s', target: 100 },

  ],

 thresholds: {
   http_req_failed: ['rate<0.10'], // http errors should be less than 10%
   http_req_duration: ['p(95) < 300'], // 95% of requests should be below 300ms

   // Count: Incorrect content cannot be returned more than 99 times.
   'Errors': ['count<100'],

   'Content OK': ['rate>0.95'],
   // Trend: Percentiles, averages, medians, and minimums
   // must be within specified milliseconds.

 },
};

export default function () {
    const url_login = 'http://localhost:3000/login';

    // Dados para a requisição POST no EndPoint Login
    let payload_login = {
      email: "fulano@qa.com",
      password: "teste"
    };

    // Faz a requisição POST
    let response_login = http.post(url_login, JSON.stringify(payload_login), {
        headers: {
            'Content-Type': 'application/json',
            'monitor': 'false'
        },
    });

  check(response_login, {
    '([POST] Login) status is 200 ': (r) => r.status === 200,
  });

  TrendRTT.add(response_login.timings.duration);
  RateContentOK.add(response_login.status === 200); // Avalia o status da resposta
  GaugeContentSize.add(response_login.body.length);
  CounterErrors.add(response_login.status !== 200);

  sleep(1);

}
