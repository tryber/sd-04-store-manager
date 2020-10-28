const { createProductVal, createProduct, readProductVal, readProduct,
  readProducts } = require('../middlewares');
const express = require('express');
const rescue = require('express-rescue');

const router = express.Router();

router.get('/', rescue(readProducts));
router.post('/', rescue(createProductVal), rescue(createProduct));

router.get('/:id', rescue(readProductVal), rescue(readProduct));

module.exports = router;
