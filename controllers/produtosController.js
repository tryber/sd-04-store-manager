const { produtoService } = require('../services');

const getAllProdutos = async (_req, res) => {
  const products = await produtoService.getAllProdutos();

  return res.status(200).json({ products });
};

// criar produto
const criarProduto = async (req, res) => {
  const { name, quantity } = req.body;
  const product = await produtoService.criarProduto(name, quantity);
  if (product.err) return res.status(422).json(product);

  return res.status(201).json(product);
};

// produto por Id
const findProdutoById = async (req, res) => {
  const { id } = req.params;
  const product = await produtoService.findProdutoById(id);

  if (product.err) return res.status(422).json(product);

  return res.status(200).json(...product);
};

// Atualiza Produto
const upProduto = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const product = await produtoService.upProduto(id, name, quantity);

  if (product.err) return res.status(422).json(product);

  return res.status(200).json(product);
};

// Deleta Produto
const deleteProduto = async (req, res) => {
  const { id } = req.params;

  const product = await produtoService.deleteProduto(id);

  if (product && product.err) return res.status(422).json(product);

  return res.status(200).end();
};

module.exports = {
  getAllProdutos,
  criarProduto,
  findProdutoById,
  upProduto,
  deleteProduto,
};
