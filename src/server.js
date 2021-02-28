// importar dependências
const express = require('express');

// juntar os caminhos de forma correta
// já sabe qual o SO e como é feito a barra (/ ou \)
const path = require('path');

// importando o arquivo pages.js
const pages = require('./pages.js');

// iniciando o express
const server = express();

server

    // utilizar body da requisição
    .use(express.urlencoded({ extended: true }))

    // criando as rotas para os arquivos estáticos (css, images, scripts)
    .use(express.static('public'))

    // configurar template engine
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'hbs')

    // rotas da aplicação
    .get('/', pages.index)
    .get('/orphanage', pages.orphanage)
    .get('/orphanages', pages.orphanages)
    .get('/create-orphanage', pages.createOrphanage)
    .post('/save-orphanage', pages.saveOrphanage)

// ligar o servidor
server.listen(5500);