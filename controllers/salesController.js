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

module.exports = router;
