const express = require('express');
const { saleErrorDealer } = require('../middlewares/errorDealer');
const salesModel = require('../models/salesModel');

const router = express.Router();

router.get('/', async (req, res) => {
  const allSales = await salesModel.getAllSales();
  res.status(200).json({ sales: allSales });
});

router.post('/', saleErrorDealer, async (req, res) => {
  const saleArray = req.body;
  const allSales = await salesModel.registerSale(saleArray);
  res.status(200).json(allSales);
});

router.put('/:id', saleErrorDealer, async (req, res) => {
  const { id } = req.params;
  const items = req.body;

  await salesModel.updateSale(id, items);
  const sale = await salesModel.getSaleById(id);

  res.status(200).json(sale);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const sale = await salesModel.getSaleById(id);
  if (id.length < 24) {
    res.status(422).json({ err: { code: 'invalid_data', message: 'Wrong sale ID format' } });
  } else if (!sale) {
    res.status(404).json({ err: { code: 'invalid_data', message: 'Sale not found' } });
  } else {
    await salesModel.removeSale(id);
    res.status(200).json(sale);
  }
});

module.exports = router;
