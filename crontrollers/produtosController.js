// const produtoModel = require('../models/produtosModels');

const addProduto = (req, res) => res.send({ data: req.body });

const listaProdutos = (req, res) => res.send({ data: req.body });

const produtoById = (req, res) => res.send({ data: req.body });

const atualizaProduto = (req, res) => res.send({ data: req.body });

const deletaProduto = (req, res) => res.send({ data: req.body });

module.exports = {
  addProduto,
  listaProdutos,
  produtoById,
  atualizaProduto,
  deletaProduto,
};
