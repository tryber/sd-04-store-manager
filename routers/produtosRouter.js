const { Router } = require('express');
const rescue = require('express-rescue');

const { produtosController } = require('../controllers');

const produtos = Router();

produtos.get('/', rescue(produtosController.getAll));

module.exports = produtos;
