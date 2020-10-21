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

router.post('/', async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const product = await productsModel.addProduct(name, quantity);
    res.status(201).json(product);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
