const { createSalesVal, createSales, readSaleVal, readSale, readSales,
  updateSaleVal, updateSale, deleteSaleVal, deleteSale } = require('../middlewares');
const express = require('express');
const rescue = require('express-rescue');

const router = express.Router();

router.get('/', rescue(readSales));
router.post('/', rescue(createSalesVal), rescue(createSales));

router.get('/:id', rescue(readSaleVal), rescue(readSale));
router.put('/:id', rescue(updateSaleVal), rescue(updateSale));
router.delete('/:id', rescue(deleteSaleVal), rescue(deleteSale));

module.exports = router;
