const express = require('express');
const product = require('../models/productsModel');

const router = express.Router();

const productValidations = require('../middlewares/productValidations');

router.post(
  '/',
  productValidations.productLengthValidation,
  productValidations.productUniqueNameValidation,
  productValidations.productQuantityValidation,
  productValidations.productQuantityTypeOfValidation,
  async (req, res) => {
    const { name, quantity } = req.body;
    const products = await product.newProduct(name, quantity);
    res.status(201).json(products);
  },
);

module.exports = router;
