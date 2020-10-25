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
      const insertedProduct = await crudModel.createOne('products', name, quantity);
      res.status(201).json(insertedProduct);
    } catch (err) {
      res.status(500).json({ err });
    }
  });

router.get('/', async (_req, res) => {
  const products = await crudModel.findAll('products');
  res.status(200).json(products);
});

module.exports = router;
