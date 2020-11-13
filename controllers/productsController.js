const express = require('express');
const ProductsServices = require('../services/productsService');

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, quantity } = req.body;
  const product = await ProductsServices.createProduct(name, quantity);

  if (product.error) return res.status(422).json({ err: product.err });
  return res.status(201).json(product);
});

router.get('/', async (req, res) => {
  const products = await ProductsServices.getAll();
  res.status(200).json(products);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await ProductsServices.getById(id);

  if (product.error) return res.status(422).json({ err: product.err });
  res.status(200).json(product);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const product = await ProductsServices.updateProduct(id, name, quantity);

  if (product.error) return res.status(422).json({ err: product.err });
  return res.status(200).json(product);
});

module.exports = router;
