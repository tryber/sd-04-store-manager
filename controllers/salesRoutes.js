const { createSalesVal, createSales, readSaleVal, readSale, readSales,
  updateSaleVal, updateSale } = require('../middlewares');
const express = require('express');
const rescue = require('express-rescue');

const router = express.Router();

router.get('/', rescue(readSales));
router.post('/', rescue(createSalesVal), rescue(createSales));

router.get('/:id', rescue(readSaleVal), rescue(readSale));
router.put('/:id', rescue(updateSaleVal), rescue(updateSale));

module.exports = router;
