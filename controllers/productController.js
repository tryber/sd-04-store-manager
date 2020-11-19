const express = require('express');
const router = express.Router();
const produModel = require('../models/productModel');
const validation = require('../service/validation');

router.post('/', validation.validateName, validation.validateQuantity, async (req, res) => {
  try {
    const { name, quantity } = req.body;

    const product = await produModel.add(name, quantity);

    return res.status(201).json(product);
  } catch (_e) {
    return res.status(500).json({ message: 'Erro ao cadastrar!' });
  }
});

router.get('/', async (_req, res) => {
  try {
    const products = await produModel.getAllProducts();

    res.status(200).json({ products });
  } catch (err) {
    res.status(500).json({ err, code: 'invalid_data', message: 'Wrong id format' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const product = await produModel.getOneProductId(id);

    if (!product) {
      return res.status(422).json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ err, code: 'invalid_data', message: 'Wrong id format' });
  }
});

router.put('/:id', validation.validateUpdate, validation.validateQuantity, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;

    await produModel.update(id, name, quantity);
    const product = await produModel.getOneProductId(id);

    return res.status(200).json(product);
  } catch (_e) {
    return res.status(500).json({ message: 'Erro ao alterar!' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await produModel.getOneProductId(id);
    const result = await produModel.remove(id);

    return res.status(200).json(product);
  } catch (_e) {
    return res.status(422).json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
  }
});

module.exports = router;
