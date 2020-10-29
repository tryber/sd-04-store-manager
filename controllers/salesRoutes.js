const { createSalesVal, createSales, readSaleVal, readSale, readSales } = require('../middlewares');
const express = require('express');
const rescue = require('express-rescue');

const router = express.Router();

router.get('/', rescue(readSales));
router.post('/', rescue(createSalesVal), rescue(createSales));

router.get('/:id', rescue(readSaleVal), rescue(readSale));

module.exports = router;
