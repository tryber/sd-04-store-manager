const productsModel = require('../models/productsModel');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await productsModel.create(name, quantity);

  res.status(201).json(newProduct);
};

const readProduct = async (req, res) => {
  const product = req.product;

  return res.status(200).json(product);
};

const readProducts = async (_, res) => {
  const products = await productsModel.read();

  return res.status(200).json({ products });
};

module.exports = {
  createProduct,
  readProduct,
  readProducts,
};
