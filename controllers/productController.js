const express = require('express');
const router = express.Router();

const productService = require('../services/productService');
const productModel = require('../model/productModel');

router.get('/', async (req, res) => {
  try {
    const products = await productModel.getAll();

    res.status(200).json({ products: products });
  } catch (_error) {}
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productService.getById(id);

    if (result.code === 'invalid_data') return res.status(422).json({ err: result });
    res.status(200).json(result);
  } catch (_err) {
    console.log(_err.message);
    res.status(500).json({ message: 'Erro ao cadadastrar o produto' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, quantity } = req.body;

    const result = await productService.add(name, quantity);

    if (result.code === 'invalid_data') return res.status(422).json({ err: result });
    res.status(201).json(result);
  } catch (_err) {
    console.log(_err.message);
    res.status(500).json({ message: 'Erro ao cadadastrar o produto' });
  }
});

module.exports = router;
