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

module.exports = router;
