const router = require('express').Router();

const productsModel = require('../models/productsModel');
const productsService = require('../services/productsService');

router.post('/', async (req, res) => {
  const { name, quantity } = req.body;

  const product = await productsService.createProduct(name, quantity);
  const { err, error } = product;

  if (error) return res.status(422).json({ err });

  return res.status(201).json(product);
});

router.get('/', async (_req, res) => {
  const products = await productsModel.getAllProducts();

  res.status(200).json({ products });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const err = { code: 'invalid_data', message: 'Wrong id format' };

  const product = await productsModel.getProductById(id);

  if (!product) return res.status(422).json({ err });

  return res.status(200).json(product);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const product = await productsService.updateProduct(id, name, quantity);

  if (product.error) return res.status(422).json({ err: product.err });
  return res.status(200).json(product);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await productsService.deleteProduct(id);

  if (product.error) return res.status(422).json({ err: product.err });
  res.status(200).json(product);
});

module.exports = router;
