import { sleep } from 'k6';
import { SharedArray } from 'k6/data';
import {BaseChecks, BaseRest, BaseService, ENDPOINTS, testeConfig} from '../../../support/base/baseTest.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

const base_uri = testeConfig.environments.hml.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

export const options = testeConfig.options.Stresshresholds;

const data_users = new SharedArray('users', function () {
    const jsonData = JSON.parse(open('../../../../../k6/projeto-base-k6/data/dynamic/user.json'));
    return jsonData; // must be an array
});
const data_products = new SharedArray('produto', function () {
    const jsonData = JSON.parse(open('../../../../../k6/projeto-base-k6/data/dynamic/produtos.json'));
    return jsonData.produtos; // must be an array
});

export function handleSummary(data) {
    return {
      "summary.html": htmlReport(data),
    };
}

// gera numero aleatorio para acessar um posicao dos arrays de usuarios e produtos
const min = 0;
const max = data_users.length;
const numeroAleatorioUsuarios = Math.floor(Math.random() * (max - min + 1)) + min

const mini = 0;
const maxi = data_products.length;
const numeroAleatorioProdutos = Math.floor(Math.random() * (maxi - mini + 1)) + mini

let nome_usuario = data_users[numeroAleatorioUsuarios].nome;    // Acessa uma posicao aleatorio no array de usuarios no campo nome
let email_usuario = data_users[numeroAleatorioUsuarios].email;  // Acessa uma posicao aleatorio no array de usuarios no campo email
let nome_produto = data_products[numeroAleatorioProdutos].nome; // Acessa uma posicao aleatorio no array de produtos no campo nome

const payload_Cadastra_Usuario = {

    nome: nome_usuario, 
    email : email_usuario,
    password : "teste",
    administrador : "true"
}
const payload_Login_Usuario = {

    email : email_usuario,
    password : "teste",  
}
               
const payload_produtos = {
    nome: nome_produto ,
    quantidade: 10,
    descricao: "Descricao",
    preco: 1
}

export default () => {
    
    // CADASTRA USUARIO
    const request_Post_User = baseRest.post(ENDPOINTS.USER_ENDPOINT, payload_Cadastra_Usuario);

    // LOGIN DO USUARIO
    const request_Get_User =  baseRest.get(ENDPOINTS.USER_ENDPOINT);
    const _id_Usuario = (JSON.parse(request_Get_User.body)).usuarios[1]._id; // Extrai o id do usuario
  
    const request_Post_User_Login = baseRest.post(ENDPOINTS.LOGIN_ENDPOINT, payload_Login_Usuario, { monitor: false , 'Content-Type': 'application/json' });
    const token_login_user = request_Post_User_Login.json().authorization; // Extrai o token do usuario logado

    //CADASTRA PRODUTO
    const response_Login = baseRest.post(ENDPOINTS.LOGIN_ENDPOINT, payload_Login_Usuario, { monitor: false , 'Content-Type': 'application/json' });
    const token = JSON.parse(response_Login.body).authorization;
    
    const response_post_produto = baseRest.post(`${ENDPOINTS.PRODUCTS_ENDPOINT}`, payload_produtos, 
        
        {
            'Authorization': `${token}`,
            'Content-Type': 'application/json',
            'monitor': 'false'
        }
    );

     // CADASTRO DE CARRINHO
    const response_get_produtos = baseRest.get(ENDPOINTS.PRODUCTS_ENDPOINT);
    let _id_produtos = response_post_produto.json()._id
 
    const payload_produtos_carrinhos = {
       "produtos": 
        [
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

    // DELETA CARRINHO

    const request_delete_carrinhos = baseRest.delete(ENDPOINTS.CARTS_ENDPOINT+`/cancelar-compra`, {}, 
    
    {
        'Authorization': `${token}`,
        'Content-Type': 'application/json',
        'monitor': 'false'
    }

    );
    
    // DELETA PRODUTO
    
    const response_delete_produto = baseRest.delete(`${ENDPOINTS.PRODUCTS_ENDPOINT}` + `/${_id_produtos}`, {}, 
    
    {
        'Authorization': `${token}`,
        'Content-Type': 'application/json',
        'monitor': 'false'
    }
    );    

    // DELETA USUARIO

    const resDelUser = baseRest.delete(ENDPOINTS.USER_ENDPOINT+`/${_id_Usuario}`);
    
    baseChecks.checkStatusCode(request_Post_User, 201);
    baseChecks.checkResponseTime(request_Post_User, 2000);
    baseChecks.checkResponseMessage(request_Post_User, "Cadastro realizado com sucesso"); 

    baseChecks.checkStatusCode(request_Post_User_Login, 200);
    baseChecks.checkResponseTime(request_Post_User_Login, 2000);
    baseChecks.checkResponseMessage(request_Post_User_Login, "Login realizado com sucesso");

    baseChecks.checkStatusCode(response_post_produto, 201);
    baseChecks.checkResponseTime(response_post_produto, 2000);
    baseChecks.checkResponseMessage(response_post_produto, "Cadastro realizado com sucesso"); 

    baseChecks.checkStatusCode(response_post_carrinhos, 201);
    baseChecks.checkResponseTime(response_post_carrinhos, 2000);
    baseChecks.checkResponseMessage(response_post_carrinhos, "Cadastro realizado com sucesso");

    baseChecks.checkStatusCode(response_delete_produto, 200);
    baseChecks.checkResponseTime(response_delete_produto, 2000);
    baseChecks.checkResponseMessage(response_delete_produto, "Registro excluído com sucesso");
    
    baseChecks.checkStatusCode(resDelUser, 200);
    baseChecks.checkResponseTime(resDelUser, 2000);
    baseChecks.checkResponseMessage(resDelUser, "Registro excluído com sucesso");  

    sleep(1);
}

