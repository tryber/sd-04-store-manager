const router = require('express').Router();

const { getAllProducts, getProductById, deleteProductById } = require('../models/productsModel');
const { createProduct, updateProduct } = require('../services/productsService');

router.post('/', async (req, res) => {
  const { name, quantity } = req.body;

  const product = await createProduct(name, quantity);
  const { err, error } = product;

  if (error) return res.status(422).json({ err });

  return res.status(201).json(product);
});

router.get('/', async (_req, res) => {
  const products = await getAllProducts();

  res.status(200).json({ products });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const err = { code: 'invalid_data', message: 'Wrong id format' };

  const product = await getProductById(id);

  if (!product) return res.status(422).json({ err });

  return res.status(200).json(product);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const err = { code: 'invalid_data', message: 'Wrong id format' };


  const product = await updateProduct(id, name, quantity);

  if (!product) return res.status(422).json({ err });

  return res.status(200).json(product);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const err = { code: 'invalid_data', message: 'Wrong id format' };

  const product = await getProductById(id);

  if (!product) return res.status(422).json({ err });

  await deleteProductById(id);

  return res.status(200).json(product);
});

module.exports = router;
