const express = require('express');
const model = require('../models/commonModel');
const validations = require('../middlewares/productValidations');

const router = express.Router();

router.get('/', async (_, res) => {
  const products = await model.getAll('products');
  res.status(200).json({ products });
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await model.findById('products', id);
    return res.status(200).json(product);
  } catch (_e) {
    res.status(422).json({
      err: { code: 'invalid_data', message: 'Wrong id format' },
    });
  }
});

router.post(
  '/',
  validations.lengthValidation,
  validations.uniqueNameValidation,
  validations.quantityValidation,
  validations.quantityTypeOfValidation,
  async (req, res) => {
    const { name, quantity } = req.body;
    const newProducts = await model.add('products', { name, quantity });
    res.status(201).json(newProducts);
  },
);

module.exports = router;
