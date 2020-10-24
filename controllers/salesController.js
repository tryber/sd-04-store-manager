const express = require('express');
const salesModel = require('../models/salesModel');
const generalModel = require('../models/generalModel');
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

router.get('/', async (_req, res) => {
  try {
    const sales = await generalModel.getAllItems('sales');
    res.status(200).json(sales);
  } catch (_err) {
    res.status(404).json(returnResponse('not_found', 'Sale not found'));
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await generalModel.getItemById(id, 'sales');
    res.status(200).json(sale);
  } catch (_err) {
    res.status(404).json(returnResponse('not_found', 'Sale not found'));
  }
});

module.exports = router;
