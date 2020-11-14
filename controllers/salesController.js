const express = require('express');

const router = express.Router();
const { findById, getAll, insertSale } = require('../models/dbModel');
const { insertSaleValidationMiddleware } = require('../services/salesService');

router.post('/', insertSaleValidationMiddleware, async (req, res) => {
  const insertedSales = await insertSale(req.body);

  try {
    return res.status(200).json(insertedSales);
  } catch (err) {
    console.error(err);
    throw res.status(500);
  }
});

router.get('/', async (req, res) => {
  const sales = await getAll('sales');
  try {
    return res.status(200).json({ sales });
  } catch (err) {
    console.error(err);
    throw res.status(500);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const sale = await findById(id, 'sales');
  try {
    if (!sale) {
      res.status(404);
      return res.json({
        err: {
          code: 'not_found',
          message: 'Sale not found',
        },
      });
    }
    return res.status(200).json(sale);
  } catch (err) {
    console.error(err);
    throw res.status(500);
  }
});

module.exports = router;
