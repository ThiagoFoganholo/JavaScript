import { sleep } from 'k6';
import { SharedArray } from 'k6/data';

import {BaseChecks, BaseRest, BaseService, ENDPOINTS, testeConfig} from '../support/base/baseTest.js'

const base_uri = testeConfig.environments.hml.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

let responseData;

export const options = testeConfig.options.SmokeThresholds;

const data = new SharedArray('Users', function () {
    const jsonData = JSON.parse(open('../data/static/user.json'));
    return jsonData.users; // must be an array
});

const payload = {
  "nome": "Fulano da Silva",
  "email": "fulano@qa.com",
  "password": "teste",
  "administrador": "true"
}

export function setup() {
  const res = baseRest.post(ENDPOINTS.USER_ENDPOINT, payload, { monitor: false });

  responseData = res.json(); // Atualizamos responseData aqui
  
  baseChecks.checkStatusCode(res, 201);
  baseChecks.checkResponseTime(res, 2000);
  baseChecks.checkResponseMessage(res, "Cadastro realizado com sucesso");
  
  return { responseData };
}

export default () => {
  let usersIndex = __ITER % data.length;
  let user = data[usersIndex];

  const urlRes = baseRest.post(ENDPOINTS.LOGIN_ENDPOINT, user);

  baseChecks.checkStatusCode(urlRes, 200);
  baseChecks.checkResponseTime(urlRes, 2000);
  baseChecks.checkResponseMessage(urlRes, "Login realizado com sucesso");

  sleep(1);
};

export function teardown(data) {
  const userID = data.responseData._id;
  const res = baseRest.delete(ENDPOINTS.USER_ENDPOINT+`/${userID}`);

  console.log(userID);

  baseChecks.checkStatusCode(res, 200);
  baseChecks.checkResponseTime(res, 2000);
  baseChecks.checkResponseMessage(res, "Registro excluído com sucesso");

}

