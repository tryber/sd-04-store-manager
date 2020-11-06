const express = require('express');
const salesValidations = require('../middlewares/salesValidation');
const salesModel = require('../models/salesModel');

const router = express.Router();

// Add new sale
router.post(
  '/',
  salesValidations.validateQuantity,
  salesValidations.validateQuantityIsNumber,
  async (req, res) => {
    const result = {
      itensSold: req.body,
    };
    const sales = await salesModel.addSale(result);
    res.status(200).json(sales);
  },
);

module.exports = router;
