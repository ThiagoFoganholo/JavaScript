import assert from 'assert';
import chai, { expect } from 'chai';
import Calculadora from '../scr/Calculadora.js';

// Teste Soma

describe('Testes de soma', () => {
  it('Deve somar 4 e 5 e o resultado deve ser 9', () => {
    let resultado = Calculadora.soma(4,5);
    expect(resultado).to.be.equals(9).and.to.be.a("number");
  })
  it('Deve somar -4 e -5 e o resultado deve ser -9', () => {
    let resultado = Calculadora.soma(-4,-5);
    expect(resultado).to.be.equals(-9).and.to.be.a("number");
  })
  it('Deve somar 0.154 e 0.501 o resultado deve ser 0.655', () => {
    let resultado = Calculadora.soma(0.154, 0.501);
    expect(resultado).to.be.equals(0.655).and.to.be.a("number");
  })
  it('Deve somar 10e5 e 15e3 o resultado deve ser 1015000', () => {
    let resultado = Calculadora.soma(10e5, 15e3);
    expect(resultado).to.be.equals(1015000).and.to.be.a("number");
  })
})

// teste subtração

describe('Testes de subtração', () => {
  it('Deve subtrair 4 e 5 e o resultado deve ser -1', () => {
    let resultado = Calculadora.subtracao(4,5);
    expect(resultado).to.be.equals(-1).and.to.be.a("number");
  })
  it('Deve subtrair -4 e -5 e o resultado deve ser 1', () => {
    let resultado = Calculadora.subtracao(-4,-5);
    expect(resultado).to.be.equals(+1).and.to.be.a("number");
  })
  it('Deve subtrair 0.154 e 0.501 o resultado deve ser -0.347', () => {
    let resultado = Calculadora.subtracao(0.154, 0.501);
    expect(resultado).to.be.equals(-0.347).and.to.be.a("number");
  })
  it('Deve subtrair 10e5 e 15e3 o resultado deve ser 985000', () => {
    let resultado = Calculadora.subtracao(10e5, 15e3);
    expect(resultado).to.be.equals(985000).and.to.be.a("number");
  })
})


// Testes multiplicação


describe('Testes de multiplicação', () => {
  it('Deve multiplicar 4 vezes 5 e o resultado deve ser 20', () => {
    let resultado = Calculadora.multiplicacao(4,5);
    expect(resultado).to.be.equals(20).and.to.be.a("number");
  })
  it('Deve multiplicar -4 vezes -5 e o resultado deve ser 1', () => {
    let resultado = Calculadora.multiplicacao(-4,-5);
    expect(resultado).to.be.equals(20).and.to.be.a("number");
  })
  it('Deve multiplicar 0.154 vezes 0.501 o resultado deve ser 0.077154', () => {
    let resultado = Calculadora.multiplicacao(0.154, 0.501);
    expect(resultado).to.be.equals(0.077154).and.to.be.a("number");
  })
  it('Deve multiplicar 10e5 vezes 15e3 o resultado deve ser 15e9', () => {
    let resultado = Calculadora.multiplicacao(10e5, 15e3);
    expect(resultado).to.be.equals(15e9).and.to.be.a("number");
  })
  it('Deve multiplicar 10e50 vezes 0 o resultado deve ser 0', () => {
    let resultado = Calculadora.multiplicacao(10e50, 0);
    expect(resultado).to.be.equals(0).and.to.be.a("number");
  })
})

// Testes divisão

describe('Testes de divisão', () => {
  it('Deve devidir 4 divido 5 e o resultado deve ser 0.8', () => {
    let resultado = Calculadora.divisao(4,5);
    expect(resultado).to.be.equals(0.8).and.to.be.a("number");
  })
  it('Deve devidir -4 divido -5 e o resultado deve ser 0.8', () => {
    let resultado = Calculadora.divisao(-4,-5);
    expect(resultado).to.be.equals(0.8).and.to.be.a("number");
  })
  it('Deve devidir 0.154 divido 0.501 o resultado deve ser 0.0.3073852295409182', () => {
    let resultado = Calculadora.divisao(0.154, 0.501);
    expect(resultado).to.be.equals(0.3073852295409182).and.to.be.a("number");
  })
  it('Deve devidir 10e5 divido 15e3 o resultado deve ser 15e9', () => {
    let resultado = Calculadora.divisao(10e5, 15e3);
    expect(resultado).to.be.equals(66.66666666666667).and.to.be.a("number");
  })
  it('Deve devidir 10e5 divido 15e3 o resultado deve ser 15e9', () => {
    let resultado = Calculadora.divisao(-10e5, 15e3);
    expect(resultado).to.be.equals(-66.66666666666667).and.to.be.a("number");
  })
  it('Deve devidir 10e5 divido 15e3 o resultado deve ser 15e9', () => {
    let resultado = Calculadora.divisao(10e5, -15e3);
    expect(resultado).to.be.equals(-66.66666666666667).and.to.be.a("number");
  })
  it('Deve devidir 0 divido 15 o resultado deve ser 0', () => {
    let resultado = Calculadora.divisao(0, 15);
    expect(resultado).to.be.equals(0).to.be.a("number").and.to.be.a("number");
  })
  it('Deve devidir 15 divido 0 o resultado deve ser 0', () => {
    let resultado = Calculadora.divisao(15, 0);
    expect(resultado).to.be.equals("Nan").and.not.to.be.a("number");
  })
})

// Testes potencia

describe('Testes potencialização', () => {
  it('Deve fazer a potencia 2 elevado na 3 e o resultado for 8', () => {
    let resultado = Calculadora.potencia(2,3);
    expect(resultado).to.be.equals(8).and.to.be.a("number");
  })
  it('Deve fazer a potencia 4 elevado na 3 e o resultado for 64', () => {
    let resultado = Calculadora.potencia(4 , 3);
    expect(resultado).to.be.equals(64).and.to.be.a("number");
  })
  it('Deve fazer a potencia 1.5 elevado na 3 e o resultado for 3.375', () => {
    let resultado = Calculadora.potencia(1.5 , 3);
    expect(resultado).to.be.equals(3.375).and.to.be.a("number");
  })
  it('Deve fazer a potencia 10 elevado na 5 e o resultado deve ser 3.375', () => {
    let resultado = Calculadora.potencia(10 , 5);
    expect(resultado).to.be.equals(100000).and.to.be.a("number");
  })
  it('Deve fazer a potencia de 0 elevado na 0 e o resultado deve ser "Nan"', () => {
    let resultado = Calculadora.potencia(0 , 0);
    expect(resultado).to.be.equals("Nan").and.not.to.be.a("number");
  })
})

// Teste PI

describe('Testes PI', () => {
  it('Deve fazer a chamada e retornar do valor de PI e retornar 3.141592653589793', () => {
    let resultado = Calculadora.pi();
    expect(resultado).to.be.equals(Math.PI).and.to.be.a("number");
  })
})


// Teste numero de Euler

describe('Testes numero de Euler', () => {
  it('Deve fazer a chamada e retornar do valor do euler e retornar 2.718281828459045', () => {
    let resultado = Calculadora.numeroDeEuler();
    expect(resultado).to.be.equals(2.718281828459045).and.to.be.a("number");
  })
})

// Teste do seno em radianos

describe('Testes do seno em radianos', () => {
  it('Deve fazer a chamada e retornar do valor do seno de 45 em raidanos, como resultado o valor ', () => {
    let resultado = Calculadora.senoEmRadianos(45);
    expect(resultado).to.be.equals(0.8509035245341184).and.to.be.a("number");
  })
})

// Teste do seno em graus

describe('Testes do seno em graus', () => {
  it('Deve fazer a chamada e retornar do valor do seno de 45 em graus, como resultado o valor 0.7071067811865475', () => {
    let resultado = Calculadora.senoEmGraus(45);
    expect(resultado).to.be.equals(0.7071067811865475).and.to.be.a("number");
  })
})

// Teste do cosseno em radianos

describe('Testes do cosseno em radianos', () => {
  it('Deve fazer a chamada e retornar do valor do seno de 45 em raidanos, como resultado o valor 0.5253219888177297', () => {
    let resultado = Calculadora.cossenoEmRadianos(45);
    expect(resultado).to.be.equals(0.5253219888177297).and.to.be.a("number");
  })
})

// Teste do cosseno em graus

describe('Testes do cosseno em radianos', () => {
  it('Deve fazer a chamada e retornar do valor do seno de 45 em graus, como resultado o valor 0.5253219888177297', () => {
    let resultado = Calculadora.cossenoEmGraus(45);
    expect(resultado).to.be.equals(0.7071067811865476).and.to.be.a("number");
  })
})

// Teste de Modulo

describe('Testes de modulos', () => {
  it('Entrar com um numero -2 e tranforma ele em modulo |2|', () => {
    let resultado = Calculadora.moduloDeUmNumero(-2);
    expect(resultado).to.be.equals(2).and.to.be.a("number");
  })
  it('Entrar com um numero 2 e tranforma ele em modulo |2|', () => {
    let resultado = Calculadora.moduloDeUmNumero(2);
    expect(resultado).to.be.equals(2).and.to.be.a("number");
  })
  it('Entrar com um numero -0.001 e tranforma ele em modulo |0.001|', () => {
    let resultado = Calculadora.moduloDeUmNumero(-0.001);
    expect(resultado).to.be.equals(0.001).and.to.be.a("number");
  })
  it('Entrar com um numero -10e3 e tranforma ele em modulo |10e3|', () => {
    let resultado = Calculadora.moduloDeUmNumero(-10e3);
    expect(resultado).to.be.equals(10e3).and.to.be.a("number");
  })
  it('Entrar com um numero -10e3 e tranforma ele em modulo |10e3|', () => {
    let resultado = Calculadora.moduloDeUmNumero(-10e3);
    expect(resultado).to.be.equals(10e3).and.to.be.a("number");
  })
})

// Teste da raiz quadrada

describe('Testes de raiz quadrada', () => {
  it('Faz a raiza quadrada de 2 e tem como resultado 1.4142135623730951', () => {
    let resultado = Calculadora.raizQuadrada(2);
    expect(resultado).to.be.equals(1.4142135623730951).and.to.be.a("number");
  })
  it('Faz a raiza quadrada de 4 e tem como resultado 2', () => {
    let resultado = Calculadora.raizQuadrada(4);
    expect(resultado).to.be.equals(2).and.to.be.a("number");
  })
  it('Faz a raiza quadrada de 0.5 e tem como resultado 0.707', () => {
    let resultado = Calculadora.raizQuadrada(0.5);
    expect(resultado).to.be.equals(0.7071067811865476).and.to.be.a("number");
  })
  it('Faz a raiza quadrada de -1 e tem como resultado Nan', () => {
    let resultado = Calculadora.raizQuadrada(-1);
    expect(resultado).to.be.equals("NaN").and.not.to.be.a("number");
  })
})

// Teste Logaritimo

describe('Testes do logaritmo decimal', () => {
  it('Faz o logaritmo decimal de 1 e tem como resultado 0', () => {
    let resultado = Calculadora.logaritmoDecimal(1);
    expect(resultado).to.be.equals(0).and.to.be.a("number");
  })
  it('Faz o logaritmo decimal de 10 e tem como resultado 1', () => {
    let resultado = Calculadora.logaritmoDecimal(10);
    expect(resultado).to.be.equals(1).and.to.be.a("number");
  })
  it('Faz o logaritmo decimal de 0 e tem como resultado Nan', () => {
    let resultado = Calculadora.logaritmoDecimal(0);
    expect(resultado).to.be.equals("Nan").and.not.to.be.a("number");
  })
  it('Faz o logaritmo decimal de 0 e tem como resultado Nan', () => {
    let resultado = Calculadora.logaritmoDecimal(-1000);
    expect(resultado).to.be.equals("Nan").and.not.to.be.a("number");
  })
})

// Teste Logaritimo Natural

describe('Testes do logaritmo natural', () => {
  it('Faz o logaritmo natural de 0 e tem como resultado Nan', () => {
    let resultado = Calculadora.logaritmoNatural(0);
    expect(resultado).to.be.equals("Nan").and.not.to.be.a("number");
  })
  it('Faz o logaritmo natural de -1000 e tem como resultado Nan', () => {
    let resultado = Calculadora.logaritmoNatural(-1000);
    expect(resultado).to.be.equals("Nan").and.not.to.be.a("number");
  })
  it('Faz o logaritmo natural de e tem como resultado 1', () => {
    let resultado = Calculadora.logaritmoNatural(Calculadora.numeroDeEuler());
    expect(resultado).to.be.equals(1).and.to.be.a("number");
  })
})

// Teste Fatorial

describe('Testes do Fatorial', () => {
  it('Faz o fatorial de 1 tem como resultado 1', () => {
    let resultado = Calculadora.fatorial(1);
    expect(resultado).to.be.equals(1).and.to.be.a("number");
  })
  it('Faz o fatorial de 5 tem como resultado 120', () => {
    let resultado = Calculadora.fatorial(5);
    expect(resultado).to.be.equals(120).and.to.be.a("number");
  })
  it('Faz o fatorial de 0 tem como resultado 1', () => {
    let resultado = Calculadora.fatorial(0);
    expect(resultado).to.be.equals(1).and.to.be.a("number");
  })
  it('Faz o fatorial de 0.1 tem como resultado "Nan"', () => {
    let resultado = Calculadora.fatorial(0.1);
    expect(resultado).to.be.equals("Nan").and.not.to.be.a("number");
  })
  it('Faz o fatorial de 8 tem como resultado 40320', () => {
    let resultado = Calculadora.fatorial(8);
    expect(resultado).to.be.equals(40320).and.to.be.a("number");
  })
  it('Faz o fatorial de -1 tem como resultado "Nan"', () => {
    let resultado = Calculadora.fatorial(-1);
    expect(resultado).to.be.equals("Nan").and.not.to.be.a("number");
  })
})
