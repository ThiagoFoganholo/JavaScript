import { sleep } from "k6";
// 1. init code

//Incia as variaveis define options (VU's, duration, Thresholds)

let counter = 1;

export function setup() {
    // 2. setup code (Executa apenas 1 vez antes da funcao principal)
    console.log(`SETUP ${counter}`);
  }
  
  export default function () {
    // 3. VU code (Ponto de entradas dos VU's, onde sao realizados os testes e chamadas na API)
    console.log(`FUNCAO PRINCIPAL - ${counter}, VU = ${__VU}, ITER = ${__ITER}`)
    counter++;
    sleep(1);
  }
  
  export function teardown() {
    // 4. teardown code (Executa apenas 1 vez apos a funcao principal)
    console.log(`TEARDOWN = ${counter}`);
  }
  