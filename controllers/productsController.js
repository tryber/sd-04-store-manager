const rescue = require('express-rescue');
const productsService = require('../services/productsService');

const listProducts = rescue(async (_req, res) => {
  const products = await productsService.getAll();
  res.status(200).json(products);
});

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productsService.getProductById(id);
    return res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

const newProduct = rescue(async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const newProductResult = await productsService.newProduct(name, quantity);

    if (newProductResult.err) {
      return res.status(422).json(newProductResult);
    }

    return res.status(201).json(newProductResult);
  } catch (err) {
    next(err);
  }
});

const validateProduct = productsService.validateProduct;

const updateProduct = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const { id } = req.params;
    const product = await productsService.updateProduct(id, name, quantity);
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  listProducts,
  newProduct,
  validateProduct,
  getProductById,
  updateProduct,
};
