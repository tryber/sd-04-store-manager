const express = require('express');
const { salesModel } = require('../models');
const validation = require('../service/validation');

const router = express.Router();

router.post('/', validation.saleQuantity, async (req, res) => {
  try {
    const salesArray = req.body;
    const sales = await salesModel.addSales(salesArray);
    console.log(sales);
    res.status(200).json(sales);
  } catch (_e) {
    console.log(_e);
    res.status(501).json({ message: 'Falha ao cadastrar o produto!' });
  }
});

module.exports = router;
