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

module.exports = router;
