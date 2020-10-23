const express = require('express');
const productsModel = require('../models/productsModel');
const productValidation = require('../middlewares/productValidations');

const router = express.Router();

router.post(
  '/',
  productValidation.validateNameLength,
  productValidation.validateQuantity,
  productValidation.validateProductExistence,
  async (req, res) => {
    try {
      const { name, quantity } = req.body;
      const product = await productsModel.insertProduct(name, quantity);
      res.status(201).json(product);
    } catch (_err) {
      res
        .status(500)
        .json({ err: { code: 'internal_error', message: 'Error registering product' } });
    }
  },
);

module.exports = router;
