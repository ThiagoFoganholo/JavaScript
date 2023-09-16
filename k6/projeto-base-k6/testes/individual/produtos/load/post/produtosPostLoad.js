import { sleep } from 'k6';
import { SharedArray } from 'k6/data';
import {BaseChecks, BaseRest, BaseService, ENDPOINTS, testeConfig} from '../../../../../support/base/baseTest.js'
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

const base_uri = testeConfig.environments.hml.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

export const options = testeConfig.options.LoadThresholds;

const data_users = new SharedArray('users', function () {
    const jsonData = JSON.parse(open('../../../../../../../k6/projeto-base-k6/data/dynamic/user.json'));
    return jsonData; // must be an array
});
const data_products = new SharedArray('produto', function () {
    const jsonData = JSON.parse(open('../../../../../../../k6/projeto-base-k6/data/dynamic/produtos.json'));
    return jsonData.produtos; // must be an array
});

export function handleSummary(data) {
    return {
      "summary.html": htmlReport(data),
    };
}

// gera numero aleatorio para acesar o array de usuarios ou de produtos
// const min = 0;
// const max = data_users.length;
// const numeroAleatorioUsuarios = Math.floor(Math.random() * (max - min + 1)) + min

const mini = 0;
const maxi = data_products.length;
const numeroAleatorioProdutos = Math.floor(Math.random() * (maxi - mini + 1)) + mini;
const min = 0;
const max = data_products.length;
const numeroAleatorioProdutos2 = Math.floor(Math.random() * (maxi - mini + 2)) + mini;

export default function () {

    let i = (__ITER % data_products.length) + numeroAleatorioProdutos + numeroAleatorioProdutos2;
    
    let product = data_products[numeroAleatorioProdutos];

    //let usersIndex = __ITER % data_users.length;
    //let users = data_users[usersIndex];

    const payload_login = {
        "email": "fulano@qa.com",
        "password": "teste",
    }
    const response_Login = baseRest.post(ENDPOINTS.LOGIN_ENDPOINT, payload_login, { monitor: false , 'Content-Type': 'application/json' });
    const token = JSON.parse(response_Login.body).authorization;

    const payload_produtos = {
        nome: product.nome + " " + numeroAleatorioProdutos + " " + i,
        quantidade: product.quantidade,
        descricao: product.descricao,
        preco: product.preco
    }

    const response_post_produto = baseRest.post(`${ENDPOINTS.PRODUCTS_ENDPOINT}`, payload_produtos, 
    
    {'Authorization': `${token}`,
    'Content-Type': 'application/json',
    'monitor': 'false'}
    );
    
    //console.log(response_post_produto.json())
        
    baseChecks.checkStatusCode(response_post_produto, 201);
    baseChecks.checkResponseTime(response_post_produto, 2000);
    baseChecks.checkResponseMessage(response_post_produto, "Cadastro realizado com sucesso");

    sleep(1);
}