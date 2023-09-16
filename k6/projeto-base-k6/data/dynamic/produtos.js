const { faker } = require('@faker-js/faker');
const fs = require('fs');

faker.location = 'pt_BR';

let quantidade = 10000;
let produtos = [];

for (let index = 0; index < quantidade; index++) {
    let numeroAleatorio = Math.floor(Math.random() * 101);
    produtos.push({
        nome: faker.commerce.product(),
        preco: faker.commerce.price(),
        descricao : faker.commerce.productDescription(),
        quantidade: numeroAleatorio
    });
}
// Criar um objeto contendo o array "users"
const result = {
    quantidade,
    produtos
};

// Converta o array de usuários para JSON
const usersJSON = JSON.stringify(result, null, 2);

// Escreva os dados no arquivo JSON
fs.writeFileSync('produtos.json', usersJSON);

console.log('Dados de usuários foram salvos em produtos.json');



