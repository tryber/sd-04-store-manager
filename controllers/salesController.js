const express = require('express');
const salesModel = require('../models/salesModel');
const salesValidations = require('../middlewares/salesValidations');

const router = express.Router();

router.get('/', async (_, res) => {
  const sales = await salesModel.getAll();
  return res.status(200).json({ sales });
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await salesModel.findById(id);
    return res.status(200).json(sale);
  } catch (err) {
    res.status(422).json({
      err: { code: 'invalid_data', message: 'Sale not found' },
    });
  }
});

router.post('/', salesValidations.isQuantityValid, async (req, res) => {
  const [...products] = req.body;
  const add = await salesModel.add(...products);
  res.status(200).json(add);
});

// router.put('/:id', async (_, res) => res.status(200).send('oi'));

// router.delete('/:id', async (_, res) => res.status(200).send('oi'));

module.exports = router;
