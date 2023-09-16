const { faker } = require('@faker-js/faker');
const fs = require('fs');

faker.location = 'pt_BR';

let users = [];
let quantidadeDeUsuarios = 10000

for (let index = 0; index < quantidadeDeUsuarios; index++) {
    users.push({
        nome: faker.person.fullName(),
        email: `${faker.internet.email({ provider: "qa.com"})}`,
        password: "teste",
        administrador: "true"
    });
}

// Converta o array de usuários para JSON
const usersJSON = JSON.stringify(users, null, 2);

// Escreva os dados no arquivo JSON
fs.writeFileSync('user.json', usersJSON);

console.log('Dados de usuários foram salvos em user.json');
