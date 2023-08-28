# Projeto da calculadora

O projeto da Calculadora visa o estudo aprofundado da linguagem JavaScript, com foco especial na implementação dos métodos **TDD com Mocha e Chai** para garantir a qualidade do código e aprimorar as práticas de desenvolvimento. Tambem, busca-se explorar de forma prática e dinâmica os conceitos fundamentais do desenvolvimento orientado a testes (TDD), utilizando as ferramentas Mocha e Chai para a criação de testes automatizados robustos e eficientes.

## Bibliotecas

	- Mocha
	- Chai


### 📋 Pré-requisitos

**Sistema operacional:** Windows 7 (com Service Pack 1) ou superior, incluindo Windows 10.
-   Arquitetura: O VSCode suporta sistemas operacionais de 32 e 64 bits.
-   Processador: Processador Intel Pentium 4 ou posterior compatível com a tecnologia SSE2.

**Requisitos gerais:**
-   Memória RAM: Recomenda-se ter pelo menos 4 GB de RAM disponíveis para uma experiência de uso mais fluida.
-   Espaço em disco: Espaço suficiente no disco rígido para instalar o VSCode e armazenar seus projetos e arquivos.
-   Resolução de tela: Uma resolução de tela de 1280 x 720 ou superior é recomendada para a melhor experiência visual.

### 🔧 Instalação
É necessário ter sido instalado o VScode para fazer os teste do mocha chai na sua maquina.

#### Os passos para fazer a instalação são :

Para instalar o Mocha e Chai em um computador, você precisará ter o Node.js e o gerenciador de pacotes npm (que é instalado automaticamente junto com o Node.js) configurados previamente. Se você ainda não tem o Node.js instalado, você pode baixá-lo e instalá-lo a partir do site oficial: [https://nodejs.org/](https://nodejs.org/)

Assumindo que você já tem o Node.js instalado, siga estes passos para instalar o Mocha e Chai:

Passo 1: Crie um projeto Node.js Abra um terminal ou prompt de comando e crie um novo diretório para o projeto. Navegue até o diretório recém-criado.

Passo 2: Inicialize o projeto Node.js Dentro do diretório do projeto, execute o seguinte comando para inicializar um novo projeto Node.js. Isso criará um arquivo package.json que irá rastrear as dependências do seu projeto.

`npm init -y` 

Passo 3: Instale o Mocha atraves do comando em terminal :
```bash
$ npm install --global mocha
```
Passo 3: Instale o Chai atraves do comando em terminal :
```bash
$ npm install chai
```
### ⚙️ Executando os testes

Agora faça o download do arquivo para abaixar a Calculadora em JavaScript:

[Calculadora](https://gitlab.com/thiagof1/sprint2/sprint_2/-/blob/pb_sprint4/Calculador%20em%20JavaScript/Arquivos%20download/Calculadora_em_JavaScript.rar)

E faça a descompactação.

Agora para iniciar abra o seu VSCode, va no canto superior da esquerda, selecione 'arquivos' e 'abrir arquivos', como mostra na imagem:

![Imagem](https://gitlab.com/thiagof1/sprint2/sprint_2/-/raw/pb_sprint4/Calculadora%20em%20JavaScript/Arquivos%20download/1.png?ref_type=heads)
Agora abra um novo terminal, como mostra na imagem :

![Imagem](https://gitlab.com/thiagof1/sprint2/sprint_2/-/raw/pb_sprint4/Calculadora%20em%20JavaScript/Arquivos%20download/2.png?ref_type=heads)

E no terminal digite o seguinte comando para rodar os testes 
```bash
$ npm test
```
**É importante que os codigo esteja em um arquivo esteja dentro de uma pasta chamada 'test'**, como mostrado na imagem :

![Imagem](https://gitlab.com/thiagof1/sprint2/sprint_2/-/raw/pb_sprint4/Calculadora%20em%20JavaScript/Arquivos%20download/3.png?ref_type=heads)

## Informações do projeto

Mocha e Chai são bibliotecas muito úteis para escrever testes em JavaScript. Elas fornecem funções que facilitam a criação de casos de teste e a verificação dos resultados esperados.

[**Mocha**](https://mochajs.org/): Mocha é um framework de testes JavaScript que nos permite escrever testes de forma clara e legível, além de oferecer recursos para facilitar a execução e organização dos testes.

[**Chai**](https://www.chaijs.com/): Chai é uma biblioteca de asserções (assertions) que nos permite fazer afirmações sobre os resultados dos testes, tornando o código dos testes mais expressivo e fácil de entender.

O Mocha e Chai fornecem essa função que nos permite fazer os teste : 
```javascript
describe('Titulo do Teste', () => {
	it('Nome do teste e resultado', () => {
	    let  teste1 =  Calculadora.teste();
	    expect(teste1).to.be.equals("Teste").and.to.be.a("string");
	})
})
```
#### Descrevendo os Testes:

**describe** é uma função usada para agrupar e descrever um conjunto de testes relacionados;

**it**: É uma função usada para escrever um caso de teste individual;

```javascript
    let teste1 = Calculadora.teste();
    expect(teste1).to.be.equals("Teste").and.to.be.a("string");
```
No trecho acima, o `teste1` receberá um valor proveniente da chamada da função `teste()` no arquivo da calculadora. Em seguida, a função `expect()` verifica se `teste1` é igual à string "Teste" e também é do tipo "string". Se as o resultados forem positivas, o resultado no terminal será uma seta verde, caso contrário, será exibido um texto em vermelho informando o erro.

Para fazer a chamada da função `Calculadora.teste()`, é necessário que haja um arquivo `Calculadora.js`, que conterá as funções relacionadas à calculadora. Por exemplo:

```javascript
static  teste(a){
	return "Teste";
}
```
No código, temos a definição da classe `Calculadora` com um método estático chamado `teste`. Esse método retorna a string "Teste".

Certifique-se de que o arquivo `Calculadora.js` esteja corretamente importado no arquivo onde deseja fazer a chamada da função `Calculadora.teste()`. Essa importação permitirá que você utilize os métodos e funcionalidades da classe `Calculadora` em seu código principal.


#### Descrevendo os Testes na Calculadora

##### **Todas as funções:**
- Soma (+);
- Subtração(-);
- Multiplicação(*);
- Divisão(/);
- Potencia(**);
- π (pi);
- e (euler);
- seno em Radianos (sin x rad);
- seno em graus (sin x°) ;
- cosem Radianos (cos x rad);
- cosem graus (cos x°) ;
- Modulo (|x|);
- Raiz quadrada(√x);
- Logaritmo Decimal (log10 x);
- Logaritmo Natural (ln x);
- Fatorial (x!);

**Soma (+):** A função `soma(a, b)` deve receber dois parâmetros, números reais. Ao receber esses números, ela retornará um valor que é a soma dos números anteriores. Caso um ou mais parâmetros sejam diferentes de um número do tipo `number`, a chamada da função retornará um resultado inesperado, resultando em um alerta de erro escrito em vermelho.
```javascript
// Função dentro da pasta Calculadora.js
static  soma(a, b){
	return  a+b;
}
```
```javascript
// Chamada de função dentro da pasta Calculadora.spec.js
	let  resultado  =  Calculadora.soma(4,5);
	expect(resultado).to.be.equals(9).and.to.be.a("number");
```
**Subtração(-):** A função `subtracao(a, b)` deve receber dois parâmetros, números reais. Ao receber esses números, ela retornará um valor que é a subtração dos números anteriores. Caso um ou mais parâmetros sejam diferentes de um número do tipo `number`, a chamada da função retornará um resultado inesperado, resultando em um alerta de erro escrito em vermelho.
```javascript
// Função dentro da pasta Calculadora.js
static  subtracao(a, b){
	return  a-b;
}
```
```javascript
// Chamada de função dentro da pasta Calculadora.spec.js
	let  resultado  =  Calculadora.subtracao(4,5);
	expect(resultado).to.be.equals(-1).and.to.be.a("number");
```
**Multiplicação(*):** A função `subtracao(a, b)` deve receber dois parâmetros, números reais. Ao receber esses números, ela retornará um valor que é da Multiplicação dos números anteriores. Caso um ou mais parâmetros sejam diferentes de um número do tipo `number`, a chamada da função retornará um resultado inesperado, resultando em um alerta de erro escrito em vermelho.
```javascript
// Função dentro da pasta Calculadora.js
static  Multiplicacao(a, b){
	return  a*b;
}
```
```javascript
// Chamada de função dentro da pasta Calculadora.spec.js
	let  resultado  =  Calculadora.Multiplicacao(4,5);
	expect(resultado).to.be.equals(20).and.to.be.a("number");
```
**Divisão(/):** A função `divisao(a, b)` deve receber dois parâmetros, números reais. Ao receber esses números, ela retornará um valor que é da divisão dos números anteriores. Em caso de o denominador ser igual a 0, a função retorna um "Nan", e caso um ou mais parâmetros sejam diferentes de um número do tipo `number`, a chamada da função retornará um resultado inesperado, resultando em um alerta de erro escrito em vermelho.
```javascript
// Função dentro da pasta Calculadora.js
static  divisao(a, b){
	if(b == 0){
		return "Nan";
	}else{
		return  a/b;
	}
}
```
```javascript
// Chamada de função dentro da pasta Calculadora.spec.js
	let  resultado  =  Calculadora.divisao(5,5);
	expect(resultado).to.be.equals(1).and.to.be.a("number");
```
**Potencia(^):** A função `potencia(a, b)` deve receber dois parâmetros, números reais, sendo o  `a` a base, `b`o expoente. Ao receber esses números, ela retornará um valor que é o resultado da potencia. Em caso da base e o expoentes serem iguais a 0, a função retorna um "Nan", e caso um ou mais parâmetros sejam diferentes de um número do tipo `number`, a chamada da função retornará um resultado inesperado, resultando em um alerta de erro escrito em vermelho.
```javascript
// Função dentro da pasta Calculadora.js
 static  potencia(a,b){
	 if(a == 0  && b == 0){
		 return  "Nan";
	 }else{
		 return  Math.pow(a,b);
	 }
 }
```
```javascript
// Chamada de função dentro da pasta Calculadora.spec.js
	let  resultado  =  Calculadora.potencia(2,3);
	expect(resultado).to.be.equals(8).and.to.be.a("number");
```
**Pi (π)):** A função `pi(a)` apenas retorna o valor aproximado de π = 3.141592653589793....
```javascript
// Função dentro da pasta Calculadora.js
static  pi(){
	return  3.141592653589793;
}
```
```javascript
// Chamada de função dentro da pasta Calculadora.spec.js
	let  resultado  =  Calculadora.pi();
	expect(resultado).to.be.equals(Math.PI).and.to.be.a("number");
```
**Euler(e):** A função `numeroDeEuler(a)` apenas retorna o valor aproximado de e = 2.718281828459045....
```javascript
// Função dentro da pasta Calculadora.js
static  numeroDeEuler(){
	return  2.718281828459045;
}
```
```javascript
// Chamada de função dentro da pasta Calculadora.spec.js
	let  resultado  =  Calculadora.numeroDeEuler();
	expect(resultado).to.be.equals(2.718281828459045).and.to.be.a("number");
```
**seno em Radianos (sin x rad):** A função `senoEmRadianos(anguloEmRadianos)` deve receber um parâmetros, número real, sendo o  `anguloEmRadianos` um numero em radianos. Ao receber esse números, ela retornará o valor do seno em radianos `return (Math.sin(anguloEmRadianos))`. Caso o parâmetro seja diferente de um número do tipo `number`, a chamada da função retornará um resultado inesperado, resultando em um alerta de erro escrito em vermelho.
```javascript
// Função dentro da pasta Calculadora.js
static  senoEmRadianos(anguloEmRadianos){
	return (Math.sin(anguloEmRadianos));
}
```
```javascript
// Chamada de função dentro da pasta Calculadora.spec.js
	let  resultado  =  Calculadora.senoEmRadianos(45);
	expect(resultado).to.be.equals(0.8509035245341184).and.to.be.a("number");
```
**seno em Graus (sin x°):** A função `senoEmGraus(anguloEmRadianos)` deve receber um parâmetros, número real, sendo o  `anguloEmRadianos` um numero em radianos. Ao receber esse números, ele converte para graus e ela retornará o valor do seno em graus em `return (Math.sin(anguloEmRadianos))`. Caso o parâmetro seja diferente de um número do tipo `number`, a chamada da função retornará um resultado inesperado, resultando em um alerta de erro escrito em vermelho.
```javascript
// Função dentro da pasta Calculadora.js
static  senoEmGraus(anguloEmRadianos){
let  AnguloEmgraus  =  anguloEmRadianos  * (Math.PI  /  180);

return (Math.sin(AnguloEmgraus));

}
```
```javascript
// Chamada de função dentro da pasta Calculadora.spec.js
	let  resultado  =  Calculadora.senoEmGraus(45);
	expect(resultado).to.be.equals(0.7071067811865475).and.to.be.a("number");
```
**cosseno em Radianos (cosx rad):** A função `cossenoEmRadianos(anguloEmRadianos)` deve receber um parâmetros, número real, sendo o  `anguloEmRadianos` um numero em radianos. Ao receber esse números, ela retornará o valor do cosseno em radianos `return (Math.cos(anguloEmRadianos))`. Caso o parâmetro seja diferente de um número do tipo `number`, a chamada da função retornará um resultado inesperado, resultando em um alerta de erro escrito em vermelho.
```javascript
// Função dentro da pasta Calculadora.js
static  cossenoEmRadianos(anguloEmRadianos){
	return (Math.cos(anguloEmRadianos));
}
```
```javascript
// Chamada de função dentro da pasta Calculadora.spec.js
	let  resultado  =  Calculadora.cossenoEmRadianos(45);
	expect(resultado).to.be.equals(0.5253219888177297).and.to.be.a("number");
```
**cosseno em Graus (cos x°):** A função `cossenoEmGraus(anguloEmRadianos)` deve receber um parâmetros, número real, sendo o  `anguloEmRadianos` um numero em radianos. Ao receber esse números, ele converte para graus e ela retornará o valor do cosseno em graus em `return (Math.sin(anguloEmRadianos))`. Caso o parâmetro seja diferente de um número do tipo `number`, a chamada da função retornará um resultado inesperado, resultando em um alerta de erro escrito em vermelho.
```javascript
// Função dentro da pasta Calculadora.js
static  senoEmGraus(anguloEmRadianos){
	let  AnguloEmgraus  =  anguloEmRadianos  * (Math.PI  /  180);
	return (Math.sin(AnguloEmgraus));

}
```
```javascript
// Chamada de função dentro da pasta Calculadora.spec.js
	let  resultado  =  Calculadora.cossenoEmGraus(45);
	expect(resultado).to.be.equals(0.7071067811865476).and.to.be.a("number");
```
**Modulo(|x|):** A função `moduloDeUmNumero(a)` apenas retorna o valor de um numero real em modulo.
```javascript
// Função dentro da pasta Calculadora.js
static  moduloDeUmNumero(a){
	if(a<0){
		return  -a ;
	}else{
		return  a; 
	}
}
```
```javascript
// Chamada de função dentro da pasta Calculadora.spec.js
	let  resultado  =  Calculadora.moduloDeUmNumero(-2);
	expect(resultado).to.be.equals(2).and.to.be.a("number");
```
**Raiz Quadrada(√x):** A função `raizQuadrada(a)` deve receber um parâmetros, números real. Ao receber esse número, ela retornará um valor que é a raiz . Em caso de o radicando ser menor que 0, a função retorna um "Nan", e caso o parâmetro sejam diferentes de um número do tipo `number`, a chamada da função retornará um resultado inesperado, resultando em um alerta de erro escrito em vermelho.
```javascript
// Função dentro da pasta Calculadora.js
static  raizQuadrada(a){
	if(a>=0){
		return  Math.sqrt(a);
	}else{
		return  "NaN";
	}
}
```
```javascript
// Chamada de função dentro da pasta Calculadora.spec.js
	let  resultado  =  Calculadora.raizQuadrada(4);
	expect(resultado).to.be.equals(2).and.to.be.a("number");
```
**Logaritmo Decimal(log10 x):** A função `logaritmoDecimal(a)` deve receber um parâmetros, números real, o logaritmando. Ao receber esse número, ela retornará um valor que é o logaritmo . Em caso do logaritmando ser menor ou igual a 0, a função retorna um "Nan", e caso o parâmetro sejam diferentes de um número do tipo `number`, a chamada da função retornará um resultado inesperado, resultando em um alerta de erro escrito em vermelho.
```javascript
// Função dentro da pasta Calculadora.js
static  logaritmoDecimal(a){
	if(a<=0){
		return  "Nan";
	}else{
		return  Math.log10(a);
	}
}
```
```javascript
// Chamada de função dentro da pasta Calculadora.spec.js
	let  resultado  =  Calculadora.logaritmoDecimal(1);
	expect(resultado).to.be.equals(0).and.to.be.a("number");
```
**Logaritmo Natural(ln x):** A função `logaritmoNatural(a)` deve receber um parâmetros, números real, o logaritmando. Ao receber esse número, ela retornará um valor que é o logaritmo . Em caso do logaritmando ser menor ou igual a 0, a função retorna um "Nan", e caso o parâmetro sejam diferentes de um número do tipo `number`, a chamada da função retornará um resultado inesperado, resultando em um alerta de erro escrito em vermelho. Nessa função faço a chamada do `Calculadora.numeroDeEuler()`para receber o valor de Euler.
```javascript
// Função dentro da pasta Calculadora.js
static  logaritmoNatural(a){
	if(a<=0){
		return  "Nan";
	}else{
		return  Math.log(a);
	}
}
```
```javascript
// Chamada de função dentro da pasta Calculadora.spec.js
	let  resultado  =  Calculadora.logaritmoNatural(Calculadora.numeroDeEuler());
	expect(resultado).to.be.equals(1).and.to.be.a("number");
```
**Fatorial(x!):** A função `fatorial(a)` deve receber um parâmetros, número inteiro positivo. Ao receber esse número, ela retornará um valor que é o fatorial. Em caso de o denominador ser menor que 0, a função retorna um "Nan", e caso um ou mais parâmetros sejam diferentes de um número do tipo `number`, a chamada da função retornará um resultado inesperado, resultando em um alerta de erro escrito em vermelho. O `Number.isInteger(a)` garante que o numero recebido é um numero inteiro, caso contrario ira retornar "Nan".
```javascript
// Função dentro da pasta Calculadora.js
static  fatorial(a){
	let  fat  =  1;
	if((Number.isInteger(a) &&  a  >=  0)){
		for(let  i  =  1 ; i<=a;i++){
			fat  =  fat  *  i ;
		}
		return  fat;
	}else{
		return  "Nan";
	}
}
```
```javascript
// Chamada de função dentro da pasta Calculadora.spec.js
	let  resultado  =  Calculadora.fatorial(5);
	expect(resultado).to.be.equals(120).and.to.be.a("number");
```


# Referencias 

codigo de fatorial : https://www.youtube.com/watch?app=desktop&v=VMMG1WYoGxo

função math (em javascript) : https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Math

formula para conversão de graus para radianos : https://matika.com.br/radianos/formula-para-converter-graus-para-radianos

como fazer um readme de instalação : https://gist.github.com/lohhans/f8da0b147550df3f96914d3797e9fb89