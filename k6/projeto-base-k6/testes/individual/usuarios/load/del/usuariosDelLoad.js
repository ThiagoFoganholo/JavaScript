import { sleep } from 'k6';
import { SharedArray } from 'k6/data';
import {BaseChecks, BaseRest, BaseService, ENDPOINTS, testeConfig} from '../../../../../support/base/baseTest.js'
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

const base_uri = testeConfig.environments.hml.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

export const options = testeConfig.options.LoadThresholds;

const data = new SharedArray('Users', function () {
  const jsonData = JSON.parse(open('../../../../../data/dynamic/user.json'));
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
    
    const resGetUser = baseRest.get(ENDPOINTS.USER_ENDPOINT);
    const response = JSON.parse(resGetUser.body);

    const userID = response.usuarios[usersIndex]._id;
    
    const resDelUser = baseRest.delete(ENDPOINTS.USER_ENDPOINT+`/${userID}`);

    baseChecks.checkStatusCode(resDelUser, 200);
    baseChecks.checkResponseTime(resDelUser, 300);
  
    sleep(1);
}


