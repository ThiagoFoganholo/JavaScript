import { sleep } from 'k6';
import { SharedArray } from 'k6/data';
import {BaseChecks, BaseRest, BaseService, ENDPOINTS, testeConfig} from '../../../../../../../k6/projeto-base-k6/support/base/baseTest.js'
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

const base_uri = testeConfig.environments.hml.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

export const options = testeConfig.options.SmokeThresholds;

const data_produtos = new SharedArray('produtos', function () {
    const jsonData = JSON.parse(open('../../../../../../../k6/projeto-base-k6/data/dynamic/produtos.json'));
    return jsonData.produtos; // must be an array
});
const data_users = new SharedArray('users', function () {
    const jsonData = JSON.parse(open('../../../../../../../k6/projeto-base-k6/data/dynamic/user.json'));
    return jsonData; // must be an array
});

const payload_login = {
    "email": "fulano@qa.com", // deixei o fulano@qa.com, pois, ele sempre estara cadastrado no banco de dados dos usuarios
    "password": "teste",
}
//para teste com diversos usuarios cadastrados
// const min = 0;
// const max = data_users.length;
// const numeroAleatorioUsuarios = Math.floor(Math.random() * (max - min + 1)) + min

// const payload_login = {
//     "email": data_users[numeroAleatorioUsuarios].email,//"fulano@qa.com", // deixei o fulano@qa.com, pois, ele sempre estara cadastrado no banco de dados dos usuarios
//     "password": "teste",
// }

export function handleSummary(data) {
    return {
      "summary.html": htmlReport(data),
    };
}

export default function () {

    let productIndex = __ITER % data_produtos.length;
    let product = data_produtos[productIndex];

    const response_Login = baseRest.post(ENDPOINTS.LOGIN_ENDPOINT, payload_login, { monitor: false , 'Content-Type': 'application/json' });
    const token = JSON.parse(response_Login.body).authorization;

    //console.log(payload_login);

    const response_get_produtos = baseRest.get(ENDPOINTS.PRODUCTS_ENDPOINT);

    let _id_produtos = (response_get_produtos.json()).produtos[productIndex]._id;

    const payload_produtos_carrinhos = {
      "produtos": [
        {
          "idProduto": _id_produtos,
          "quantidade": 1
        },
      ]
    }    
    
    //Linha para criar um carrinho 
    const response_post_carrinhos = baseRest.post(`${ENDPOINTS.CARTS_ENDPOINT}`, payload_produtos_carrinhos, 
    
        {
            'Authorization': `${token}`,
            'Content-Type': 'application/json',
            'monitor': 'false'
        }
        
    );
    
    console.log(response_post_carrinhos.json());

    //Linha para deletar um carrinho 
    const request_delete_carrinhos = baseRest.delete(ENDPOINTS.CARTS_ENDPOINT+`/cancelar-compra`, {}, 
    
        {
            'Authorization': `${token}`,
            'Content-Type': 'application/json',
            'monitor': 'false'
        }

    );
  
    console.log(request_delete_carrinhos.body);
  
    baseChecks.checkStatusCode(request_delete_carrinhos, 200);
    baseChecks.checkResponseTime(request_delete_carrinhos, 2000); 
    baseChecks.checkResponseMessage(request_delete_carrinhos, "Registro excluído com sucesso. Estoque dos produtos reabastecido");
    
    sleep(1);
    
}
