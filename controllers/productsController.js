const rescue = require('express-rescue');
const productsService = require('../services/productsService');

const listProducts = rescue(async (_req, res) => {
  const products = await productsService.getAll();
  res.status(200).json(products);
});

const newProduct = rescue(async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const newProductResult = await productsService.newProduct(name, quantity);
    res.status(201).json(newProductResult);
  } catch (err) {
    next(err);
  }
});

const validateProduct = productsService.validateProduct;

module.exports = {
  listProducts,
  newProduct,
  validateProduct,
};
