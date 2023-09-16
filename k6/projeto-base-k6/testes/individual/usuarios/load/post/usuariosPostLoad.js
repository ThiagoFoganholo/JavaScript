import { sleep } from 'k6';
import { SharedArray } from 'k6/data';
import {BaseChecks, BaseRest, BaseService, ENDPOINTS, testeConfig} from '../../../../../support/base/baseTest.js'
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

const base_uri = testeConfig.environments.hml.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

export const options = testeConfig.options.LoadThresholds;

const data = new SharedArray('Users', function () {
  const jsonData = JSON.parse(open('../../../../../../projeto-base-k6/data/dynamic/user.json'));
  return jsonData; // must be an array
});

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  };
}

export default function () {
    
    let usersIndex = __ITER % data.length;
    let user = data[usersIndex];  

    console.log(user);
    
    const res = baseRest.post(ENDPOINTS.USER_ENDPOINT, user, { monitor: false , 'Content-Type': 'application/json' });

     console.log(res.json());

    baseChecks.checkStatusCode(res, 201);
    baseChecks.checkResponseTime(res, 2000);
    baseChecks.checkResponseMessage(res, "Cadastro realizado com sucesso");

    sleep(1);

}