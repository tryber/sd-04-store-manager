const express = require('express');
const productsModel = require('../models/productsModel');
const productValidation = require('../middlewares/productValidations');
const returnResponse = require('../services/returnResponse');

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
      res.status(500).json(returnResponse('internal_error', 'Error registering product'));
    }
  },
);

router.get('/', async (_req, res) => {
  try {
    const products = await productsModel.getAllProducts();
    res.status(200).json(products);
  } catch (_err) {
    res.status(404).json(returnResponse('not_found', 'Page not found'));
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productsModel.getProductById(id);
    res.status(200).json(product);
  } catch (_err) {
    res.status(422).json(returnResponse('invalid_data', 'Wrong id format'));
  }
});

module.exports = router;
