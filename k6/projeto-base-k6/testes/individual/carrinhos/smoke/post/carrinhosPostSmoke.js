import { sleep } from 'k6';
import { SharedArray } from 'k6/data';
import {BaseChecks, BaseRest, BaseService, ENDPOINTS, testeConfig} from '../../../../../../../k6/projeto-base-k6/support/base/baseTest.js'
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

const base_uri = testeConfig.environments.hml.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

export const options = testeConfig.options.SmokeThresholds;

const data_users = new SharedArray('users', function () {
  const jsonData = JSON.parse(open('../../../../../../../k6/projeto-base-k6/data/dynamic/user.json'));
  return jsonData; // must be an array
});
const data_produtos = new SharedArray('produto', function () {
  const jsonData = JSON.parse(open('../../../../../../../k6/projeto-base-k6/data/dynamic/produtos.json'));
  return jsonData.produtos; // must be an array
});

const min = 0;
const max = data_users.length;
const numeroAleatorioUsuarios = Math.floor(Math.random() * (max - min + 1)) + min;

const mini = 0;
const maxi = data_produtos.length;
const numeroAleatorioProdutos = Math.floor(Math.random() * (maxi - mini + 1)) + mini;

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  };
}

export default function () {

  //let usersIndex = __ITER % data_users.length;
  let users = data_users[numeroAleatorioUsuarios];

  //let productIndex = __ITER % data_produtos.length;
  let product = data_produtos[numeroAleatorioProdutos];


  const payload_login = {

      "email": "fulano@qa.com", //Necessita fazer um cadastro antes do usuario
      "password": "teste",
    }
  const response_Login = baseRest.post(ENDPOINTS.LOGIN_ENDPOINT, payload_login, { monitor: false , 'Content-Type': 'application/json' });
  const token = JSON.parse(response_Login.body).authorization;

  const response_get_produtos = baseRest.get(ENDPOINTS.PRODUCTS_ENDPOINT);

  let _id_produtos = (response_get_produtos.json()).produtos[0]._id;

  //console.log(users.email)

  const payload_produtos_carrinhos = {
    "produtos": [
      {
        "idProduto": _id_produtos,
        "quantidade": 1
      },
      ]
    }    
    
  const response_post_carrinhos = baseRest.post(`${ENDPOINTS.CARTS_ENDPOINT}`, payload_produtos_carrinhos, 
    
    {
      'Authorization': `${token}`,
      'Content-Type': 'application/json',
      'monitor': 'false'
    }
  );
    
  console.log(response_post_carrinhos.json())
        
  baseChecks.checkStatusCode(response_post_carrinhos, 201);
  baseChecks.checkResponseTime(response_post_carrinhos, 2000);
  baseChecks.checkResponseMessage(response_post_carrinhos, "Cadastro realizado com sucesso");

  sleep(1);
}