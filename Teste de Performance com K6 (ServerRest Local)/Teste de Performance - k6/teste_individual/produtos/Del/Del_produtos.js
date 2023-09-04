import http from 'k6/http';
import { Trend, Rate, Counter, Gauge } from 'k6/metrics';
import { sleep } from 'k6';
import { check } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const TrendRTT = new Trend('RTT');
export const RateContentOK = new Rate('Content OK');
export const GaugeContentSize = new Gauge('ContentSize');
export const CounterErrors = new Counter('Errors');

export const options = {

  stages:[

    // SMOKE
    
    // { duration: '10s', target: 1 }, 
  
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
   
  // Extrai o _id do produto
  const url_produtos = 'http://localhost:3000/produtos';

  // Extrai o _id do usuario, no caso o usuario 0 
  const response_produtos = http.get(url_produtos); // Guarda os dados na varialve
  //console.log(response_produtos.json());
  const jsonResponseProdutos = JSON.parse(response_produtos.body); // Analisa o corpo da resposta como JSON
  const quantidadeDeProdutosCadastradosNoArrayProdutos = parseInt(jsonResponseProdutos.quantidade); // Armazena o tamanho do array produtos na variavel
  //console.log(typeof(quantidadeDeProdutosCadastrados));

  //gera um numero aleatorio para ser escolhido para o array
  let max = quantidadeDeProdutosCadastradosNoArrayProdutos;
  let min = 0;  
  const numeroDoArrayEscolhidoAleatorio = Math.floor(Math.random() * (max - min) + min);

  const _id_produto = jsonResponseProdutos.produtos[numeroDoArrayEscolhidoAleatorio]._id; // Faz o acesso do campo _id

  //console.log("_id do produto = " + _id_produto)

  let headers_del_produtos = {
      'Authorization': `Bearer ${token_Bearer}`,
      'Content-Type': 'application/json',
      'monitor': 'false'
  };

  const url_produto = `http://localhost:3000/produtos/${_id_produto}`;

  const response_delete_produto = http.del(url_produto, null, { headers: headers_del_produtos });

  check(response_delete_produto, {
    '([DEL] produto deletado) status is 200': (r) => r.status === 200,
  });

  TrendRTT.add(response_delete_produto.timings.duration);
  RateContentOK.add(response_delete_produto.status === 200);
  GaugeContentSize.add(response_delete_produto.body.length);
  CounterErrors.add(response_delete_produto.status !== 200); 

  sleep(1);

}
