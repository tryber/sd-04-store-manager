const { Router } = require('express');
const rescue = require('express-rescue');

const { produtosController } = require('../controllers');

const produtos = Router();

produtos.get('/', rescue(produtosController.getAllProdutos));
produtos.post('/', rescue(produtosController.criarProduto));
produtos.get('/:id', rescue(produtosController.findProdutoById));
produtos.put('/:id', rescue(produtosController.upProduto));
produtos.delete('/:id', rescue(produtosController.deleteProduto));

module.exports = produtos;
