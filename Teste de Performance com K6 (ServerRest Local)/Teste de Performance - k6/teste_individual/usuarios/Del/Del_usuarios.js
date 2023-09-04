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
    
    // { duration: '1s', target: 1 }, 
  
    // LOAD
  
    // { duration: '5',   target: 100 }, 
    // { duration: '10s', target: 100 }, 
    // { duration: '5s',  target: 50 },
  
    // STRESS e SPIKE
  
    // { duration: '5s', target: 100 }, 
    // { duration: '5s', target: 100 }, 
    // { duration: '5s', target: 50 },
    // { duration: '2s', target: 1000 },
    // { duration: '5s', target: 100 },
  
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

  const url_usuarios = 'http://localhost:3000/usuarios';

  const url_usuarios_delete = 'http://localhost:3000/usuarios/';

  // Extrai o _id do usuario, no caso o usuario 0 
   
   const response_usuarios = http.get(url_usuarios_delete); // Guarda os dados na varialve
   //console.log(response_usuarios.json());
   const jsonResponseUsuarios = JSON.parse(response_usuarios.body); // Analisa o corpo da resposta como JSON
   //console.log(jsonResponseUsuarios);
   const _id = jsonResponseUsuarios.usuarios[0]._id; // Faz o acesso do campo _id
 
   //console.log(url_usuarios_delete + _id);
   
   const response = http.del(url_usuarios_delete + _id);

   check(response, {
     '([DEL]usuarios) status is 200 ': (r) => r.status === 200,
   });

   TrendRTT.add(response.timings.duration);
   RateContentOK.add(response.status === 200);
   GaugeContentSize.add(response.body.length);
   CounterErrors.add(response.status ==! 200); 
  
   sleep(1);

}
