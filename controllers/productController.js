const express = require('express');

const productService = require('../services/productService');
const productModel = require('../model/productModel');

const router = express.Router();

router.get('/', async (_req, res) => {
  const products = await productModel.getAll();

  res.status(200).json({ products });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await productService.getById(id);

  if (result.code === 'invalid_data') return res.status(422).json({ err: result });
  res.status(200).json(result);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const result = await productService.update(id, name, quantity);

  if (result.code === 'invalid_data') return res.status(422).json({ err: result });
  res.status(200).json(result);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await productModel.remove(id);

  if (!result) {
    return res.status(422).json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
  }
  res.status(200).json(result);
});

router.post('/', async (req, res) => {
  const { name, quantity } = req.body;

  const result = await productService.add(name, quantity);

  if (result.code === 'invalid_data') return res.status(422).json({ err: result });
  res.status(201).json(result);
});

router.post('/', async (req, res) => {
  const { name, quantity } = req.body;

  const result = await productService.add(name, quantity);

  res.status(201).json(result);
});

module.exports = router;
