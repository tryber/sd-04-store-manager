const express = require('express');
const productsModel = require('../models/productsModel');
const generalModel = require('../models/generalModel');
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
    const products = await generalModel.getAllItems('products');
    res.status(200).json(products);
  } catch (_err) {
    res.status(404).json(returnResponse('not_found', 'Page not found'));
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await generalModel.getItemById(id, 'products');
    res.status(200).json(product);
  } catch (_err) {
    res.status(422).json(returnResponse('invalid_data', 'Wrong id format'));
  }
});

router.put(
  '/:id',
  productValidation.validateNameLength,
  productValidation.validateQuantity,
  productValidation.validateProductExistence,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { name, quantity } = req.body;
      await productsModel.updateProduct(id, name, quantity);
      const updatedProduct = await productsModel.getProductById(id);
      res.status(200).json(updatedProduct);
    } catch (_err) {
      res.status(500).json(returnResponse('internal_error', 'Error updating product'));
    }
  },
);

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await productsModel.getProductById(id);
    await productsModel.deleteProduct(id);
    res.status(200).json(deletedProduct);
  } catch (_err) {
    res.status(422).json(returnResponse('invalid_data', 'Wrong id format'));
  }
});

module.exports = router;
