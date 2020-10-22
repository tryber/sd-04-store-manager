const express = require('express');
const salesModel = require('../models/salesModel');

const router = express.Router();

router.get('/', async (_req, res) => {
  const sales = await salesModel.getSales();
  res.status(200).json({ sales });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const sale = await salesModel.getSaleById(id);
  if (sale) {
    return res.status(200).json(sale);
  }
  return res.status(404).json({
    err: {
      code: 'not_found',
      message: 'Sale not found',
    },
  });
});

router.post('/', async (req, res, next) => {
  const products = req.body;
  const filterQuantity = products.filter(
    (item) => item.quantity < 1 || typeof item.quantity !== 'number',
  );
  if (filterQuantity.length > 0) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }
  return next();
});

router.post('/', async (req, res) => {
  const products = req.body;
  const sales = await salesModel.addSale(products);
  res.status(200).json(sales);
});

module.exports = router;
