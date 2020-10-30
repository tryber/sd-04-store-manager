const express = require('express');
const validator = require('../service/validator');
const { createOne, findAll, update, findById, remove } = require('../models/productModel');

const router = express.Router();

router.post('/', validator.validateSales, async (req, res) => {
  const document = {
    itensSold: req.body,
  };
  const insertedSales = await createOne('sales', document);
  res.status(200).json(insertedSales);
});

router.get('/', async (_req, res) => {
  const sales = await findAll('sales');
  res.status(200).json({ sales });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const sale = await findById('sales', id);
  if (!sale) {
    return res.status(404).json({ err: { code: 'not_found', message: 'Sale not found' } });
  }
  res.status(200).json(sale);
});

router.put('/:id', validator.validateSales, async (req, res) => {
  const { id } = req.params;
  const document = {
    itensSold: req.body,
  };
  await update('sales', id, document);
  findById('sales', id).then((sale) => res.status(200).json(sale));
});

router.delete('/:id', validator.validateSaleById, async (req, res) => {
  await remove('sales', req.params.id);
  res.status(200).json(req.sale);
});

module.exports = router;
