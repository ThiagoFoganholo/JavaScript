import http from 'k6/http';
import { Trend, Rate, Counter, Gauge } from 'k6/metrics';
import { sleep } from 'k6';
import { check } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const TrendRTT = new Trend('RTT');
export const RateContentOK = new Rate('Content OK');
export const GaugeContentSize = new Gauge('ContentSize');
export const CounterErrors = new Counter('Errors');

function gerarNumeroAleatorio(minimo, maximo) {
  return Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;
}

const min = 0;
const max = 999;
let numeroString;

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

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  };
}

export default function () {

  // Extrai o token Bearer do login

  const url_login = 'http://localhost:3000/login';
  
  // preenche os campos do json
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

  //console.log(response_login.json());
  
  const jsonResponseLogin = JSON.parse(response_login.body); // Faz a analise o corpo da resposta como JSON
  const authorization = jsonResponseLogin.authorization; // Faz o Acesso do campo authorization
  
  //console.log(authorization); // Imprime o valor do campo authorization

  let token_Bearer; // cria uma variavel para armazenar o Token Bearer

  if (authorization && authorization.startsWith('Bearer ')) {
    token_Bearer = authorization.substring('Bearer '.length);  // Armazena apenas o token sem o bearer na variavel token_Bearer
    //console.log("token Bearer = " + token_Bearer);
  } else {
    console.log('Nenhum token encontrado na resposta.');
  }

  // Faz o cadastro dos produtos 
 
  let headers = {
    'Authorization': `Bearer ${token_Bearer}`,
    'Content-Type': 'application/json',
    'monitor': 'false'
  };

  const url = 'http://localhost:3000/produtos';

  for (let i = 0; i < 1; i++) {
    const numero = gerarNumeroAleatorio(min, max);
    numeroString = String(numero);
  }

  let payload_produtos = {
    nome: "Produto - " + numeroString,
    preco: 50,
    descricao: "Descricao",
    quantidade: 1
  };

  let response = http.post(url, JSON.stringify(payload_produtos), {
    headers: headers,
  });

  check(response, {
    '([POST] produtos) status is 201 ': (r) => r.status === 201,
  });

  TrendRTT.add(response.timings.duration);
  RateContentOK.add(response.status === 201);
  GaugeContentSize.add(response.body.length);
  CounterErrors.add(response.status !== 201);

  sleep(1);
}
