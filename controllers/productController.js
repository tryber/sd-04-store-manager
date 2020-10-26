const express = require('express');
const rescue = require('express-rescue');
const productService = require('../services/productService');

class ProductsError extends Error {
  constructor(message = '') {
    super(message);
  }
}

const router = express.Router();

router.get('/', rescue(async (req, res) => {
  const productsArray = await productService.getAll();
  if (productsArray.length === 0) {
    throw new ProductsError('No products have been found!');
  }
  const products = { products: productsArray };
  res.status(200).json(products);
}));

router.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const product = await productService.getById(id);
  if (!product) {
    throw new ProductsError('Wrong id format');
  }

  res.status(200).json(product);
}));

router.post('/', rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const result = await productService.add(name, quantity);
  if (typeof result === 'string') {
    throw new ProductsError(result);
  }

  res.status(201).json(result);
}));

router.put('/:id', rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  const updatedResult = await productService.update(id, name, quantity);
  if (typeof result === 'string') {
    throw new ProductsError(updatedResult);
  }

  res.status(200).json(updatedResult);
}));

router.use(rescue.from(ProductsError, (err, req, res) => {
  res.status(422)
    .json({ err: { code: 'invalid_data', message: err.message } });
}));

router.use((err, req, res) => {
  res.status(500)
    .json({ err: 'Something went terribly wrong' });
});

module.exports = router;
