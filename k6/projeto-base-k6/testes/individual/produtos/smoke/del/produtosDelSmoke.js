import { sleep } from 'k6';
import { SharedArray } from 'k6/data';
import {BaseChecks, BaseRest, BaseService, ENDPOINTS, testeConfig} from '../../../../../../projeto-base-k6/support/base/baseTest.js'
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

const base_uri = testeConfig.environments.hml.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

let responseData;
let token;
let _id_produto;

export const options = testeConfig.options.SmokeThresholds;

export function handleSummary(data) {
    return {
      "summary.html": htmlReport(data),
    };
}

const data_products = new SharedArray('produtos', function () {
  const jsonData = JSON.parse(open('../../../../../../../k6/projeto-base-k6/data/dynamic/produtos.json'));
  return jsonData.produtos; // must be an array
});

const payload = {
    "email": "fulano@qa.com",
    "password": "teste",
}

export function setup() {
    
    const response_Login = baseRest.post(ENDPOINTS.LOGIN_ENDPOINT, payload, { monitor: false , 'Content-Type': 'application/json' });
    token = JSON.parse(response_Login.body).authorization;
    
    const response_produto =  baseRest.get(ENDPOINTS.PRODUCTS_ENDPOINT);
    _id_produto = JSON.parse(response_produto.body).produtos[2]._id;

    return{ token , _id_produto};

}

export default function (data) {

    const response_delete_produto = baseRest.delete(`${ENDPOINTS.PRODUCTS_ENDPOINT}` + `/${data._id_produto}`, {}, 
    
        {
            'Authorization': `${data.token}`,
            'Content-Type': 'application/json',
            'monitor': 'false'
        }
    );   

    console.log(data._id_produto);
    
    console.log(response_delete_produto.json());
        
    baseChecks.checkStatusCode(response_delete_produto, 200);
    baseChecks.checkResponseTime(response_delete_produto, 2000);
    baseChecks.checkResponseMessage(response_delete_produto, "Registro excluído com sucesso");

    sleep(1);
}
