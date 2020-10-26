const { createProductVal, createProduct } = require('../middlewares');
const express = require('express');
const rescue = require('express-rescue');

const router = express.Router();

router.post('/', rescue(createProductVal), rescue(createProduct));

module.exports = router;
