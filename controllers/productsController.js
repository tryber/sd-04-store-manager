const { resourceGone } = require('@hapi/boom');
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

// show all products
router.get('/', async (req, res) => {
  const products = await productsModel.findAll();

  res.status(200).json({ products });
});

// show product
router.get('/:id', productsValidations.validateIdExistence, async (req, res) =>
  res.status(200).json(req.product),
);

module.exports = router;
