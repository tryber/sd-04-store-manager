const express = require('express');
const salesModel = require('../models/salesModel');

const router = express.Router();

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
