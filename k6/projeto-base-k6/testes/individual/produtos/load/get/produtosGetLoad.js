import { sleep } from 'k6';
import { SharedArray } from 'k6/data';
import {BaseChecks, BaseRest, BaseService, ENDPOINTS, testeConfig} from '../../../../../support/base/baseTest.js'
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

const base_uri = testeConfig.environments.hml.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

export const options = testeConfig.options.LoadThresholds;

export function handleSummary(data) {
    return {
      "summary.html": htmlReport(data),
    };
}
export default () => {
    const res = baseRest.get(ENDPOINTS.PRODUCTS_ENDPOINT);
      
    baseChecks.checkStatusCode(res, 200);
    baseChecks.checkResponseTime(res, 2000);

    sleep(1);
}