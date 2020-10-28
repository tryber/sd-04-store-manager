const { createSalesVal, createSales } = require('../middlewares');
const express = require('express');
const rescue = require('express-rescue');

const router = express.Router();

router.post('/', rescue(createSalesVal), rescue(createSales));

module.exports = router;
