const express = require('express');
const productsValidations = require('../middlewares/productsValidation');
const productsModel = require('../models/productsModel');

const router = express.Router();

// Add new product
router.post(
  '/',
  productsValidations.validateNameLength,
  productsValidations.validateNameExistence,
  productsValidations.validateQuantity,
  productsValidations.validateQuantityIsNumber,
  async (req, res) => {
    try {
      const { name, quantity } = req.body;
      const product = await productsModel.addProduct(name, quantity);

      res.status(201).json(product);
    } catch (_e) {
      res.status(501).json({ message: 'Failed to register the product!' });
    }
  },
);

module.exports = router;
