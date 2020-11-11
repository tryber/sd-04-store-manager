const express = require('express');
const ProductsServices = require('../services/productsService');

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, quantity } = req.body;
  const product = await ProductsServices.createProduct(name, quantity);

  if (product.error) return res.status(422).json({ err: product.err });
  return res.status(201).json(product);
});
