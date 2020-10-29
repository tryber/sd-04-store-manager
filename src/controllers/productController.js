const express = require('express');
const { findById, findAll, update, createOne, remove } = require('../models/productModel');
const validator = require('../service/validator');

const router = express.Router();

router.post('/', validator.validateProduct, async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const product = await createOne('products', name, quantity);

    res.status(201).json(product);
  } catch (_e) {
    console.log(_e);
    res.status(501).json({ message: 'Falha ao cadastrar o produto!' });
  }
});

router.get('/', async (req, res) => {
  try {
    const products = await findAll('products');
    res.status(200).json({ products });
  } catch (_e) {
    console.log(_e);
    res.status(501).json({ message: 'Falha ao carregar os produtos!' });
  }
});

router.get('/:id', validator.validateProductById, async (req, res) => {
  res.status(200).json(req.product);
});

router.put('/:id', validator.validateProduct, async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  try {
    await update('products', id, name, quantity);
    const product = await findById('products', id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.delete('/:id', validator.validateProductById, async (req, res) => {
  const { id } = req.params;
  await remove('products', id);
  res.status(200).json(req.product);
});

module.exports = router;
