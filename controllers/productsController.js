const express = require('express');
const productsModel = require('../models/productsModel');

const router = express.Router();

router.get('/', async (_req, res) => {
  const products = await productsModel.getProducts();
  res.status(200).json({ products });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await productsModel.getProductById(id);

  if (!product) {
    return res.status(422).json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
  }
  res.status(200).json(product);
});

router.post('/', async (req, res, next) => {
  const { name } = req.body;
  if (name.length < 5) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    });
  }
  return next();
});

router.post('/', async (req, res, next) => {
  const { name } = req.body;
  const product = await productsModel.getProductByName(name);
  if (product) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    });
  }
  return next();
});

router.post('/', async (req, res, next) => {
  const { quantity } = req.body;
  if (quantity < 1) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    });
  }
  return next();
});

router.post('/', async (req, res, next) => {
  const { quantity } = req.body;
  if (typeof quantity !== 'number') {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    });
  }
  return next();
});

router.post('/', async (req, res) => {
  const { name, quantity } = req.body;
  const product = await productsModel.addProduct(name, quantity);
  res.status(201).json(product);
});

module.exports = router;
