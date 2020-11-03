const express = require('express');

const salesModel = require('../model/salesModel');
const salesService = require('../services/salesService');

const router = express.Router();

router.post('/', async (req, res) => {
  const itensSold = req.body;

  const result = await salesService.adicionar(itensSold);

  if (result.code === 'invalid_data') return res.status(422).json({ err: result });
  res.status(200).json(result);
});

router.get('/:id', async (req, res) => {
  try {
    const resuls = await salesModel.getById(req.params.id);

    if (!resuls) throw new Error();
    res.status(200).json({ resuls });
  } catch (error) {
    res.status(404).json({ err: { code: 'not_found', message: 'Sale not found' } });
  }
});

router.get('/', async (_req, res) => {
  const sales = await salesModel.getAll();

  res.status(200).json({ sales });
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const itensSold = req.body;

    const result = await salesService.update(id, itensSold);

    res.status(200).json(result);
  } catch (error) {
    res
      .status(422)
      .json({ err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const value = await salesModel.remove(id);

    res.status(200).json(value);
  } catch (error) {
    res.status(422).json({ err: { code: 'invalid_data', message: 'Wrong sale ID format' } });
  }
});

module.exports = router;
