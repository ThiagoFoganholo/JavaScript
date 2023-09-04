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

function gerarNumeroAleatorio(minimo, maximo) {
  return Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;
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
  const url = 'http://localhost:3000/usuarios';

  const min = 0;
  const max = 999999;
  let numeroString;

  for (let i = 0; i < 1 ; i++) {
      const numero = gerarNumeroAleatorio(min, max);
      numeroString = String(numero); // Convertendo o número para uma string;
  }

    // Dados para a requisição POST (pode ser um objeto ou uma string)
    let payload = {
      nome: 'teste_' + numeroString,
      email: 'teste_'+ numeroString +'@qa.com',
      password: numeroString,
      administrador: 'true',
  };

  // Faz a requisição POST
  let response = http.post(url, JSON.stringify(payload), {
    headers: {
        'Content-Type': 'application/json',
        'monitor': 'false'
    },
  });

  check(response, {
    '([POST] usuarios) status is 201 ': (r) => r.status === 201,
  });

  TrendRTT.add(response.timings.duration);
  RateContentOK.add(response.status === 201); // Avalia o status da resposta
  GaugeContentSize.add(response.body.length);
  CounterErrors.add(response.status !== 201);

  sleep(1);

}
