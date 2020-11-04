const productModel = require('../models/productModel');

const showProducts = async (req, res) => {
  const products = await productModel.getAll();
  res.status(200).json({ products });
};

const addProduct = async (req, res) => {
  const { name, quantity } = req.body;
  await productModel.addProduct(name, quantity);
  const product = await productModel.findByName('products', name);
  res.status(201).json(product);
};

const findByIdParams = async (req, res) => {
  const { id } = req.params;
  const product = await productModel.findById('products', id);
  res.status(200).json(product);
};

module.exports = { showProducts, addProduct, findByIdParams };
