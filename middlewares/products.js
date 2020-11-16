const productsModel = require('../models/productsModels');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await productsModel.create(name, quantity);

  res.status(201).json(newProduct);
};

const readProduct = (req, res) => {
  const product = req.product;

  res.status(200).json(product);
};

const readProducts = async (_, res) => {
  const products = await productsModel.read();

  res.status(200).json({ products });
};

const updateProduct = async (req, res) => {
  const id = req.params.id;
  const { name, quantity } = req.body;
  const product = await productsModel.update(id, name, quantity);

  res.status(200).json(product);
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;
  const product = await productsModel.del(id);

  res.status(200).json(product);
};

module.exports = {
  createProduct,
  readProduct,
  readProducts,
  updateProduct,
  deleteProduct,
};
