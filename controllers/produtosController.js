const { produtoService } = require('../services');

const getAllProdutos = async (_req, res) => {
  const products = await produtoService.getAllProdutos();

  return res.status(200).json({ products });
};

// criar produto
const criarProduto = async (req, res) => {
  const { name, quantity } = req.body;
  const produto = await produtoService.criarProduto(name, quantity);
  if (produto.err) return res.status(422).json(produto);

  return res.status(201).json(produto);
};

// produto por Id
const findProdutoById = async (req, res) => {
  const { id } = req.params;
  const products = await produtoService.findProdutoById(id);

  if (products.err) return res.status(422).json(products);

  return res.status(200).json(...products);
};

// Atualiza Produto
const upProduto = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const products = await produtoService.upProduto(id, name, quantity);

  if (products.err) return res.status(422).json(products);

  return res.status(200).json(req.products);
};

// Deleta Produto
const deleteProduto = async (req, res) => {
  const { id } = req.params;

  const products = await produtoService.deleteProduto(id);

  if (products && products.err) return res.status(422).json(products);

  return res.status(200).end();
};

module.exports = {
  getAllProdutos,
  criarProduto,
  findProdutoById,
  upProduto,
  deleteProduto,
};
