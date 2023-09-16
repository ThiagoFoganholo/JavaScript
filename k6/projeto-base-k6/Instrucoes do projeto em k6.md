
# Teste de Performance no k6

O K6 é uma poderosa ferramenta de código aberto voltada para testes de desempenho. Ele permite avaliar como sua aplicação ou sistema se comporta sob diferentes cargas de trabalho, identificando gargalos e oportunidades de otimização. Com o K6, você pode medir o desempenho de suas aplicações de maneira eficiente e confiável, ajudando a garantir uma experiência de usuário consistente e de alta qualidade. Este repositório contém informações e exemplos para ajudar você a começar a utilizar o K6 em seus projetos de teste de desempenho.

## Bibliotecas usadas
  - node.js
  - k6
  - faker
  - check 
  - expect
  - choco  
  - htmlReport
  - npx
  - npm

## Download do k6

[Link do k6](https://gitlab.com/thiagof1/sprint2/sprint_2/-/blob/pb_sprint7/k6/Downloads/k6.rar)


### 📋 Pré-requisitos
  

**Sistema operacional:** Windows 7 (com Service Pack 1) ou superior, incluindo Windows 10.

- Arquitetura: O VSCode suporta sistemas operacionais de 32 e 64 bits.

- Processador: Processador Intel Pentium 4 ou posterior compatível com a tecnologia SSE2.

**Requisitos gerais:**

- Memória RAM: Recomenda-se ter pelo menos 4 GB de RAM disponíveis para uma experiência de uso mais fluida.

- Espaço em disco: Espaço suficiente no disco rígido para instalar o VSCode e armazenar seus projetos e arquivos.

- Resolução de tela: Uma resolução de tela de 1280 x 720 ou superior é recomendada para a melhor experiência visual.

### 🔧 Instalação

É necessário ter sido instalado o VScode para fazer os testes no k6, e para ser instalado o k6 tem que seguir os passo-a-paso como forme a [documentação do k6](https://k6.io/docs/get-started/installation/), e tambem rodar localmente o banco de dados da serveRest para isso insira a linha de comando da [npm](https://www.npmjs.com/package/download) `npm install download` no Windows PowerShell, e em seguida para rodar o banco de dados da serveRest localemnte insira o comando `npx serverest@latest` apos isso, ja estara pronto para iniciar os testes.Para mais informacoes sobre a [ServeRest](https://github.com/ServeRest/ServeRest#teste-de-carga)

## Informações do projeto

o k6 é uma ferramenta de código aberto utilizada para testar o desempenho de aplicações e serviços da web. É projetado principalmente para testes de carga, estresse e desempenho, permitindo que os desenvolvedores de qualidade avaliem como uma aplicação se comporta sob diferentes cargas de tráfego e condições. Os testes são basicamente dividos em, Smoke(fumaça, um teste rapido), Load( Carga) e Stress (Estresse), que são :

**Teste de Fumaça (Smoke Test):**

**Objetivo**: Verificar se a aplicação pode ser iniciada com sucesso e se as 	funcionalidades essenciais estão operacionais.

**Escopo**: Testa os cenários básicos para garantir que as funcionalidades principais não estão quebradas.

**Uso**: Geralmente realizado após uma nova versão ou atualização de software para identificar problemas óbvios antes de testes mais abrangentes.
Resultados: Se o teste de fumaça falhar, é um sinal de que a aplicação não está pronta para testes mais aprofundados.

**Teste de Carga (Load Test):**

 **Objetivo**: Avaliar o desempenho do sistema sob cargas normais ou esperadas de usuários.

**Escopo**: Simula múltiplos usuários ou transações para verificar como o sistema responde a cargas típicas.

**Uso**: Identifica gargalos de desempenho, capacidade de escalabilidade e determina se a aplicação pode suportar o número esperado de usuários.
Resultados: Fornece métricas de desempenho, como tempo de resposta, taxa de erros e utilização de recursos.

 **Teste de Estresse (Stress Test):**

**Objetivo**: Avaliar o comportamento do sistema sob cargas excepcionais ou condições extremas.

**Escopo**: Aplica cargas muito maiores do que as condições normais para determinar como o sistema se comporta em situações de sobrecarga.

**Uso**: Ajuda a identificar pontos de falha, estabilidade e limites do sistema.
Resultados: Pode revelar falhas inesperadas, como crashes ou lentidão extrema, e auxiliar na otimização do sistema para lidar com situações de alto estresse.

**Teste na ServeRest**

Nesse projeto tem como objetivo avaliar o desempenho da API da ServeRest. Para garantir que ela seja capaz de lidar com situações adversas de demanda, os testes de performance são realizados em diferentes níveis de demanda, desde um tráfego mínimo até picos de alta demanda.

A taxa de demanda varia de acordo com os cenários de teste. Ela é essencial para simular situações reais de uso, onde múltiplos usuários acessam a API simultaneamente. Isso permite identificar possíveis gargalos e problemas de desempenho que podem surgir quando a carga aumenta.

Os usuários simultâneos são uma parte crítica desses testes. Eles representam o comportamento do mundo real, onde pessoas interagem com a API ao mesmo tempo. Testar a capacidade de resposta da API sob essa condição ajuda a garantir que ela funcione de maneira suave e eficiente, independentemente do número de usuários ativos.

Os testes de performance de qualidade usando o k6 desempenham um papel fundamenta na criação de sistemas de software robustos e confiáveis. Eles ajudam a garantir que as APIs, como a da ServeRest, atendam às expectativas dos usuários e funcionem sem problemas em condições diversas de demanda.


### Como rodar os Testes no k6 e verificar seus resultados
#### Passo inicial :

Apos feito o download e a extração do arquivo é recomendado seguir os seguintes passos:

1.  Navegue até a pasta "data" no caminho `C:\Users\Thiago\Desktop\Sprint 7\k6\projeto-base-k6\data\dynamic`.
    
2.  No terminal, execute o comando `node user.js` e, em seguida, execute o comando `node produtos.js`. Isso criará uma quantidade específica de usuários e produtos que serão usados nos testes nos endpoints.
    
Se você desejar, pode ajustar a quantidade de usuários ou produtos seguindo estas etapas:

Para alterar a quantidade de usuários:

1.  Acesse a pasta `user.js`.
2.  Localize a variável chamada `quantidadeDeUsuarios`, conforme mostrado na figura abaixo:

![imagem1](https://gitlab.com/thiagof1/sprint2/sprint_2/-/raw/pb_sprint7/k6/Downloads/1.png)

3.  Altere o valor dessa variável de acordo com suas necessidades.

Para ajustar a quantidade de produtos:

1.  Acesse a pasta `produtos.js`.
2.  Encontre a variável chamada `quantidade`, conforme ilustrado na figura abaixo:

![imagem2](https://gitlab.com/thiagof1/sprint2/sprint_2/-/raw/pb_sprint7/k6/Downloads/2.png)

3.  Modifique o valor da variável de acordo com o que você deseja.

Depois de concluir essas etapas, você terá gerado uma massa de dados contendo os usuários e produtos necessários para serem usados nos testes posteriores.

#### passos para o testes 

Agora com a massa de dados criadas podemos iniciar os testes.
Dentro das pasta terao os Endpoints e, você encontrará mais 3 subpastas. Nestas subpastas, você terá a possibilidade de escolher o tipo de teste que deseja realizar: Smoke, Load e Stress, como mostrado na imagem:

![imagem3](https://gitlab.com/thiagof1/sprint2/sprint_2/-/raw/pb_sprint7/k6/Downloads/3.png)

###### ** Lembrete**:  Os testes seguem a Swagger da [ServeRest](https://serverest.dev/#/), onde cada Endpoint tem seu respectivo verbo, como LOGIN (Post), USUARIOS (Post, Put, Get, Del), PRODUTOS (Post, Put, Get, Del), CARRINHOS (Post, Put, Get, Del).

Ao escolher uma das Rotas e teste de performance, serão mostradas mais 3 subpastas: "del", "get" e "post", onde cada uma representa suas funções. A pasta "post" é usada para cadastrar um novo usuário, a pasta "get" é para verificar os usuários cadastrados no banco de dados, e a pasta "del" é para realizar a exclusão do usuário. Isso funciona da mesma forma para os demais Endpoints, com exceção do Endpoint do LOGIN, onde é possível realizar apenas os testes Smoke, Load e Stress no verbo "post.

![imagem4](https://gitlab.com/thiagof1/sprint2/sprint_2/-/raw/pb_sprint7/k6/Downloads/4.png)


Ao escolher uma pasta, é necessário navegar por todo o caminho para alcançá-la. Vamos usar a pasta 'LOGIN' como exemplo, fazendo o teste de smoke:

No terminal, você verá o seguinte caminho: `C:\Users\{Seu nome}\Desktop\{Pasta onde está o arquivo}\k6\projeto-base-k6>`. Para avançar para a próxima pasta, você deve inserir o comando `cd testes`. O terminal mostrará: `C:\Users\{Seu nome}\Desktop\{Pasta onde está o arquivo}\k6\projeto-base-k6>\testes`. Em seguida, digite `cd individual`, e o terminal exibirá: `C:\Users\{Seu nome}\Desktop\{Pasta onde está o arquivo}\k6\projeto-base-k6>\testes\individual`. Depois, insira `cd login`, e você verá: `C:\Users\{Seu nome}\Desktop\{Pasta onde está o arquivo}\k6\projeto-base-k6>\testes\login`. Por fim, digite `cd smoke`, e o terminal mostrará: `C:\Users\{Seu nome}\Desktop\{Pasta onde está o arquivo}\k6\projeto-base-k6>\testes\smoke`. Após executar todos esses comandos, você estará pronto para iniciar os testes com o seguinte comando no terminal: `k6 run loginSmoke.js`. Dessa forma, você terá executado seu primeiro teste de smoke.

![imagem5](https://gitlab.com/thiagof1/sprint2/sprint_2/-/raw/pb_sprint7/k6/Downloads/5.png)

Esse mesmo procedimento se aplica aos demais testes, tanto nas pastas 'individual' quanto nas pastas 'fluxo'.

Você pode alterar a quantidade de vus (virtual users / usuários virtuais) entrando na pasta "envoronment", no caminho `C:\Users\{Seu nome}\Desktop\{Pasta onde está o arquivo}\k6\projeto-base-k6\support\config\environment.js` e fazer as alterações de tempo de execução e vus, como mostra no exemplo abaixo:

```javascript
SmokeThresholds: {
	vus:  1, // Usuarios virtuais, podem ser alterados
	duration:  '1s', //  duracao em segundos, podem ser alterados
	thresholds: {
		http_req_duration: ['p(95) < 2000'],
		http_req_failed : ['rate < 0.01']
	}
},
LoadThresholds: {
	vus:  1, // Usuarios virtuais, podem ser alterados
	duration:  '1s', //  duracao em segundos, podem ser alterados
	thresholds: {
		http_req_duration: ['p(95) < 2000'],
		http_req_failed : ['rate < 0.01']
	}
},
Stresshresholds: {
	vus:  1, // Usuarios virtuais, podem ser alterados
	duration:  '1s', //  duracao em segundos, podem ser alterados
	thresholds: {
		http_req_duration: ['p(95) < 2000'],
		http_req_failed : ['rate < 0.01']
	}
},
```

![imagem6](https://gitlab.com/thiagof1/sprint2/sprint_2/-/raw/pb_sprint7/k6/Downloads/6.png)

### ⚙️Exemplo de  Execução de um testes  


Agora para iniciar abra o seu VSCode, va no canto superior da esquerda, selecione 'arquivos' e 'abrir arquivos', como mostra na imagem:  

![Imagem](https://gitlab.com/thiagof1/sprint2/sprint_2/-/raw/pb_sprint4/Calculadora%20em%20JavaScript/Arquivos%20download/1.png?ref_type=heads)

Agora abra um novo terminal, como mostra na imagem :
  

![Imagem](https://gitlab.com/thiagof1/sprint2/sprint_2/-/raw/pb_sprint4/Calculadora%20em%20JavaScript/Arquivos%20download/2.png?ref_type=heads)

 
Va até a pasta que deseje fazer os testes, ja na pasta desejada no terminal digite o seguinte comando para rodar os testes

```bash
k6 run ("nome da pasta que quer roda").js
```
Exemplo:
```bash
k6 run loginSmoke.js
```

Aqui esta um exemplo de como rodar um arquivo :

![imagem 8](https://gitlab.com/thiagof1/sprint2/sprint_2/-/raw/pb_sprint7/k6/Downloads/7.png)

###### ** Lembrete**:  O comando  `cd..` retorna a uma pasta anterior, o `ls`, lista todas as pastas contida dentro do diretório em que você esta. E o `cd "nome pasta`, entra nessa pasta.

E por ultimo ao rodar pelo menos 1 vez os k6 com a biblioteca [htmlReport](https://github.com/benc-uk/k6-reporter) ele ira gerar os dados para as analises de performance.

![imagem 9](https://gitlab.com/thiagof1/sprint2/sprint_2/-/raw/pb_sprint7/k6/Downloads/8.png)

# Referências  

Documentação k6  : https://k6.io/docs/

Instalação do k6 :https://k6.io/docs/get-started/installation/  

ServeRest : https://serverest.dev/#/

K6 HTML Report Exporter v2 : https://github.com/benc-uk/k6-reporter

npm : https://www.npmjs.com/package/download

ServeRest Git Hub : https://github.com/ServeRest/ServeRest