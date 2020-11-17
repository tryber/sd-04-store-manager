const { produtoService } = require('../services');
const produtosModel = require('../models/produtoModel');

const getAll = async (_req, res) => {
  const produtos = await produtoService.getAllProdutos();

  return res.status(200).json({ produtos });
};

// criar produto
const criarProduto = async (req, res) => {
  const { name, quantity } = req.body;
  const produto = await produtosModel.criarProdutos(name, quantity);
  if (produto.err) return res.status(422).json(produto);

  return res.status(201).json(produto);
};

// produto por Id
const findProdutoById = async (req, res) => {
  const { id } = req.params;
  const produto = await produtoService.getProductById(id);

  if (produto.err) return res.status(422).json(produto);

  return res.status(200).json(...produto);
};

// Atualiza Produto
const upProduto = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const produto = await produtoService.updateProduct(id, name, quantity);

  if (produto.err) return res.status(422).json(produto);

  return res.status(200).json(produto);
};

// Deleta Produto
const deleteProduto = async (req, res) => {
  const { id } = req.params;

  const produto = await produtoService.deleteProduct(id);

  if (produto && produto.err) return res.status(422).json(produto);

  return res.status(200).end();
};

module.exports = {
  getAll,
  criarProduto,
  findProdutoById,
  upProduto,
  deleteProduto,
};
