const express = require('express');
const router = express.Router();
const saleModel = require('../models/salesModel');
const validation = require('../service/validation');

router.post('/', validation.validateSale, async (req, res) => {
  try {
    const [...itensSold] = req.body;

    const solded = await saleModel.addSale(itensSold);

    return res.status(200).json(solded);
  } catch (_e) {
    return res.status(500).json({ message: 'Erro ao cadastrar!' });
  }
});

router.get('/', async (_req, res) => {
  try {
    const sales = await saleModel.getAllSales();

    res.status(200).json({ sales });
  } catch (err) {
    res.status(500).json({ err, code: 'invalid_data', message: 'Wrong id format' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const sale = await saleModel.getOneSaleId(id);

    if (!sale) {
      return res.status(404).json({ err: { code: 'not_found', message: 'Sale not found' } });
    }

    res.status(200).json(sale);
  } catch (err) {
    res.status(500).json({ err, code: 'invalid_data', message: 'Wrong id format' });
  }
});

module.exports = router;
