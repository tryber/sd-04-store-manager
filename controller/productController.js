const productModel = require('../models/productModel');
const productService = require('../service/productService');

const cadastraProduto = async (req, res) => {
  const { name, quantity } = req.body;
  const nameProd = await productModel.findByName({ name });

  if (name.length <= 5) {
    productService.countProductSize(res);
  }
  if (quantity <= 0) {
    productService.countMoreThenZero(res);
  }
  if (typeof quantity === 'string') {
    productService.verifyString(res);
  }
  if (nameProd && nameProd.name === name) {
    productService.verifyWithExist(res);
  }
  {
    const product = await productModel.cadastraProduto(name, quantity);
    res.status(201).json(product);
  }
};

const listaProdutos = async (_, res) => {
  const listProd = await productModel.listProducts();
  res.status(200).json({ products: listProd });
};

const listProdutosPorId = async (req, res) => {
  const { id } = req.params;
  const productById = await productModel.findById(id);

  if (!productById) {
    productService.verifyProductById(res);
  }

  res.status(200).json(productById);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  if (name.length <= 5) {
    productService.countProductSize(res);
  }
  if (quantity <= 0) {
    productService.countMoreThenZero(res);
  }
  if (typeof quantity === 'string') {
    productService.verifyString(res);
  }

  await productModel.updateProduct(id, name, quantity);
  const productById = await productModel.findById(id);
  res.status(200).json(productById);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const productById = await productModel.findById(id);
  await productModel.removeProduct(id);

  if (!productById) {
    productService.verifyProductById(res);
  }

  res.status(200).json(productById);
};

module.exports = {
  cadastraProduto,
  listaProdutos,
  listProdutosPorId,
  updateProduct,
  deleteProduct,
};
