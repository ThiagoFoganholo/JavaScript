import http from 'k6/http';
import { Trend,Rate,Counter,Gauge } from 'k6/metrics';
import { sleep } from 'k6';
import { check, fail } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const TrendRTT = new Trend('RTT');
export const RateContentOK = new Rate('Content OK');
export const GaugeContentSize = new Gauge('ContentSize');
export const CounterErrors = new Counter('Errors');

function gerarNumeroAleatorio(minimo, maximo) {
  return Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;
}

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
    http_req_duration: ['p(95) < 300'], // 95% of requests should be below 1s

    // Count: Incorrect content cannot be returned more than 99 times.
    'Errors': ['count<100'],

    'Content OK': ['rate>0.95'],
    // Trend: Percentiles, averages, medians, and minimums
    // must be within specified milliseconds.

  },
};

export default function () {

//CRIAÇÃO DE USUARIOS
  const url_usuarios = 'http://localhost:3000/usuarios';

  const min = 0;
  const max = 99999;
  let numeroString;

  for (let i = 0; i < 1 ; i++) {
      const numero = gerarNumeroAleatorio(min, max);
      numeroString = String(numero); // Convertendo o número para uma string;
  }
    // Dados para a requisição POST (pode ser um objeto ou uma string)
    let payload_usuarios = {
      nome: 'teste_' + numeroString,
      email: 'teste_'+ numeroString +'@qa.com',
      password: numeroString,
      administrador: 'true',
  };

  // Faz a requisição POST
  let response_usuarios = http.post(url_usuarios, JSON.stringify(payload_usuarios), {
      headers: {
          'Content-Type': 'application/json',
          'monitor': 'false'
      },
  });

  // Extrai o nome do json payload
  const jsonResponseCadastro = JSON.parse(JSON.stringify(payload_usuarios)); // Faz a analise o corpo da resposta como JSON
  const nome = jsonResponseCadastro.nome; // Faz o Acesso do campo nome do Json
  //console.log(nome);

  let guardaNome = []; // cria um array para armazenar o nome cadastrado
  guardaNome.push(nome); // coloca no array

  //console.log(guardaNome);

  check(response_usuarios, {
    '([POST] Usuario criado com sucesso) status is 201 ': (r) => r.status === 201,
  });

//LOGIN DE USUARIO

const url_login = 'http://localhost:3000/login';

// Dados para a requisição POST no EndPoint Login
let payload_login = {
  email: 'teste_'+ numeroString +'@qa.com',
  password: numeroString
};

// Faz a requisição POST
let response_login = http.post(url_login, JSON.stringify(payload_login), {
    headers: {
        'Content-Type': 'application/json',
        'monitor': 'false'
    },
});
check(response_login, {
'([POST] Login com sucesso) status is 200 ': (r) => r.status === 200,
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
    //console.log('Nenhum token encontrado na resposta.');
  }

//CRIAÇÃO DE PRODUTO

  // Faz o cadastro dos produtos 
 
  let headers = {
    'Authorization': `Bearer ${token_Bearer}`,
    'Content-Type': 'application/json',
    'monitor': 'false'
  };

  const url_criacao_produto = 'http://localhost:3000/produtos';

  let payload_produtos = {
    nome: "Produto - " + numeroString,
    preco: 50,
    descricao: "Descricao",
    quantidade: 1
  };

  let response_post_produto = http.post(url_criacao_produto, JSON.stringify(payload_produtos), {
    headers: headers,
  });

  check(response_post_produto, {
    '([POST] Criacao de produtos) status is 201 ': (r) => r.status === 201,
  });  

//DELETA PRODUTO
  
  const url_login_Del_Produto = 'http://localhost:3000/login';
   
  // Extrai o _id do produto
  const url_produtos = 'http://localhost:3000/produtos';

  // Extrai o _id do usuario, no caso o usuario 0 
  const response_produtos = http.get(url_produtos); // Guarda os dados na varialve
  //console.log(response_produtos.json());
  const jsonResponseProdutos = JSON.parse(response_produtos.body); // Analisa o corpo da resposta como JSON
  const quantidadeDeProdutosCadastradosNoArrayProdutos = parseInt(jsonResponseProdutos.quantidade); // Armazena o tamanho do array produtos na variavel
  //console.log(typeof(quantidadeDeProdutosCadastrados));

  //gera um numero aleatorio para ser escolhido para o array
  let maximo = quantidadeDeProdutosCadastradosNoArrayProdutos;
  let minimo = 0;  
  const numeroDoArrayEscolhidoAleatorio = Math.floor(Math.random() * (maximo - minimo) + minimo);

  const _id_produto = jsonResponseProdutos.produtos[maximo-1]._id; // Faz o acesso do campo _id

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


//DELETA USUARIO

const url_usuarios_delete = 'http://localhost:3000/usuarios/';

const response_Del_usuarios = http.get(url_usuarios_delete);
const jsonResponseUsuarios = JSON.parse(response_Del_usuarios.body);
const quantidadeDeUsuariosCadastradosNoArrayUsuarios = parseInt(jsonResponseUsuarios.quantidade);

let response ;
const _id = jsonResponseUsuarios.usuarios[quantidadeDeUsuariosCadastradosNoArrayUsuarios-1]._id

response = http.del(url_usuarios_delete + _id)

   //console.log(url_usuarios_delete + _id);
   
   //const response = http.del(url_usuarios_delete + _id);

   check(response, {
     '([DEL] usuario deletado) status is 200 ': (r) => r.status === 200,
   });
 
  TrendRTT.add(response_usuarios.timings.duration || response_login.timings.duration || response_post_produto.timings.duration || response_delete_produto.timings.duration || response.timings.duration);
  RateContentOK.add(response_usuarios.status === 201 || response_login.status === 200 || response_post_produto.status === 201 || response_delete_produto.status === 200 || response.status === 200); // Avalia o status da resposta
  GaugeContentSize.add(response_usuarios.body.length || response_login.body.length || response_post_produto.body.length || response_delete_produto.body.length || response.body.length);
  CounterErrors.add(response_usuarios.status !== 201 || response_login.status !== 200 || response_post_produto.status !== 201 || response_delete_produto.status !== 200 || response.status !== 200);

  sleep(1);

}
