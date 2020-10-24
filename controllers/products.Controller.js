const express = require('express');
const product = require('../models/productsModel');

const router = express.Router();

const productValidations = require('../middlewares/productValidations');

router.post(
  '/',
  productValidations.productLengthValidation,
  productValidations.productUniqueNameValidation,
  productValidations.productQuantityValidation,
  productValidations.productQuantityTypeOfValidation,
  async (req, res) => {
    const { name, quantity } = req.body;
    const products = await product.newProduct(name, quantity);
    res.status(201).json(products);
  },
);

router.get('/', async (_, res) => {
  const products = await product.getAll();
  return res.status(200).json({ products });
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const products = await product.findById(id);
    return res.status(200).json(products);
  } catch (_e) {
    res.status(422).json({
      err: { code: 'invalid_data', message: 'Wrong id format' },
    });
  }
});

module.exports = router;
