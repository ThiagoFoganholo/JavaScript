import http from "k6/http";
import { BaseService } from "./baseService.js";

export class BaseRest extends BaseService {
    constructor(base_uri){
        super(base_uri);
    }
    // GET
    get(endpoint, headers = {}, params = {}) {
        const url = this.base_uri + endpoint;
        const options = this.buildOptions(headers, params);
        return http.get(url, options);
    }
    // POST
    post(endpoint, body, headers = {}, params = {}) {
        const url = this.base_uri + endpoint;
        const options = this.buildOptions(headers, params);
        return http.post(url, JSON.stringify(body), options);
    }
    // PUT
    put(endpoint, body, headers = {}, params = {}) {
        const url = this.base_uri + endpoint;
        const options = this.buildOptions(headers, params);
        return http.put(url, JSON.stringify(body), options);
    }
    // DELETE
    delete(endpoint, body, headers = {}, params = {}) {
        const url = this.base_uri + endpoint;
        const options = this.buildOptions(headers, params);
        return http.del(url, JSON.stringify(body), options);
    }

    buildOptions(headers ={}, params = {}){
        return{
            headers: Object.assign({'Content-Type': 'application/json'}, headers),
            params: Object.assign({}, params)
        }
    }
}