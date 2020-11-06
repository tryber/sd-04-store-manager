const express = require('express');
const crudModel = require('../models/crudModel');
const validations = require('../middlewares/inputValidations');

const router = express.Router();

router.post('/',
  validations.validateNameLength,
  validations.verifyIfProductExists,
  validations.validateQuantity,
  async (req, res) => {
    const { name, quantity } = req.body;
    try {
      const insertedProduct = await crudModel.createOne('products', { name, quantity });
      res.status(201).json(insertedProduct);
    } catch (err) {
      res.status(500).json({ err });
    }
  });

router.get('/', async (_req, res) => {
  const products = await crudModel.findAll('products');
  res.status(200).json({ products });
});

router.get('/:id',
  validations.verifyIfProductExistsById,
  async (req, res) => {
    res.status(200).json(req.product);
  });

router.put('/:id',
  validations.validateNameLength,
  validations.validateQuantity,
  validations.verifyIfProductExistsById,
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
  });

router.delete('/:id',
  validations.verifyIfProductExistsById,
  async (req, res) => {
    const { id } = req.params;
    await crudModel.remove('products', id);
    res.status(200).json(req.product);
  });

module.exports = router;
