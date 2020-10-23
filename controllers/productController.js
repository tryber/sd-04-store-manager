const express = require('express');
const router = express.Router();

const productService = require('../services/productService');
const productModel = require('../model/productModel');

router.get('/', async (_req, res) => {
  try {
    const products = await productModel.getAll();

    res.status(200).json({ products: products });
  } catch (_err) {
    console.log(_err.message);
    res.status(500).json({ message: 'Erro ao receber os produtos' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productService.getById(id);

    if (result.code === 'invalid_data') return res.status(422).json({ err: result });
    res.status(200).json(result);
  } catch (_err) {
    console.log(_err.message);
    res.status(500).json({ message: 'Erro ao receber o produto' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;

    const result = await productService.update(id, name, quantity);
    console.log(result);
    if (result.code === 'invalid_data') return res.status(422).json({ err: result });
    res.status(200).json(result);
  } catch (_err) {
    console.log(_err.message);
    res.status(500).json({ message: 'Erro ao atualizar o produto' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productModel.remove(id);

    if (!result)
      return res.status(422).json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
    res.status(200).json(result);
  } catch (_err) {
    console.log(_err.message);
    res.status(500).json({ message: 'Erro ao deletar o produto' });
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
