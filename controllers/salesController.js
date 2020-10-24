const express = require('express');
const salesModel = require('../models/salesModel');
const saleValidation = require('../middlewares/saleValidations');
const returnResponse = require('../services/returnResponse');

const router = express.Router();

router.post('/', saleValidation.validateQuantity, async (req, res) => {
  try {
    const { body } = req;
    const sales = await salesModel.insertSale(body);
    res.status(200).json(sales);
  } catch (_err) {
    res.status(500).json(returnResponse('internal_error', 'Error registering sale'));
  }
});

router.get('/', async (req, res) => {
  try {
    const sales = await salesModel.getAllSales();
    res.status(200).json(sales);
  } catch (_err) {
    res.status(404).json(returnResponse('not_found', 'Sale not found'));
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await salesModel.getSaleById(id);
    res.status(200).json(sale);
  } catch (_err) {
    res.status(404).json(returnResponse('not_found', 'Sale not found'));
  }
});

module.exports = router;
