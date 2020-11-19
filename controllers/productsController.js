const express = require('express');
const validations = require('../middlewares/inputValidations');
const crudModel = require('../models/crudModel');

const router = express.Router();

router.get('/', async (_req, res) => {
  const products = await crudModel.findAll('products');
  res.status(200).json({ products });
});

router.post(
  '/',
  validations.validateName,
  validations.verifyProducts,
  validations.validateQuantity,
  async (req, res) => {
    const { name, quantity } = req.body;
    try {
      const insertedProduct = await crudModel.createOne('products', { name, quantity });
      res.status(201).json(insertedProduct);
    } catch (err) {
      res.status(500).json({ err });
    }
  },
);

router.get('/:id', validations.verifyProductById, async (req, res) => {
  res.status(200).json(req.product);
});

router.put(
  '/:id',
  validations.validateName,
  validations.validateQuantity,
  validations.verifyProductById,
  async (req, res) => {
    const { name, quantity } = req.body;
    const { id } = req.params;
    try {
      await crudModel.update('products', id, { name, quantity });
      const product = await crudModel.findById('products', id);
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({ err });
    }
  },
);

module.exports = router;
