const { createProductVal, createProduct, readProductVal, readProduct,
  readProducts, updateProductVal, updateProduct, deleteProductVal,
  deleteProduct } = require('../middlewares');
const express = require('express');
const rescue = require('express-rescue');

const router = express.Router();

router.get('/', rescue(readProducts));
router.post('/', rescue(createProductVal), rescue(createProduct));

router.get('/:id', rescue(readProductVal), rescue(readProduct));
router.put('/:id', rescue(updateProductVal), rescue(updateProduct));
router.delete('/:id', rescue(deleteProductVal), rescue(deleteProduct));

module.exports = router;
