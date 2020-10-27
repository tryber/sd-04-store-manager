const express = require('express');
const model = require('../models/commonModel');

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
    const products = await model.add({ name, quantity }, 'products');
    res.status(201).json(products);
  },
);

router.get('/', async (_, res) => {
  const products = await model.getAll('products');
  return res.status(200).json({ products });
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const products = await model.findById(id, 'products');
    return res.status(200).json(products);
  } catch (_e) {
    res.status(422).json({
      err: { code: 'invalid_data', message: 'Wrong id format' },
    });
  }
});

router.put(
  '/:id',
  productValidations.productLengthValidation,
  productValidations.productQuantityValidation,
  productValidations.productQuantityTypeOfValidation,
  async (req, res) => {
    const { name, quantity } = req.body;
    const { id } = req.params;
    await model.updateProduct(id, { name, quantity }, 'products');
    res.status(200).json(await model.findById(id, 'products'));
  },
);

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const removeProduct = await model.findById(id, 'products');
    await model.deleteProduct(id);
    res.status(200).json(removeProduct);
  } catch (err) {
    res.status(422).json({
      err: { code: 'invalid_data', message: 'Wrong id format' },
    });
  }
});

module.exports = router;
