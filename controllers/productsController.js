const express = require('express');
const model = require('../models/model');
const productValidation = require('../middlewares/products');

const router = express.Router();

router.get('/', async (_req, res) => {
  const products = await model.getProductsOrSales('products');
  res.status(200).json({ products });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await model.getProductOrSaleById(id, 'products');

  if (!product) {
    return res.status(422).json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
  }
  res.status(200).json(product);
});

router.post(
  '/',
  productValidation.nameLength,
  productValidation.nameExists,
  productValidation.quantityValue,
  productValidation.quantityType,
  async (req, res) => {
    const { name, quantity } = req.body;
    const product = await model.addProduct(name, quantity);
    res.status(201).json(product);
  },
);

router.put(
  '/:id',
  productValidation.nameLength,
  productValidation.quantityValue,
  productValidation.quantityType,
  async (req, res) => {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const updated = await model.updateProduct(id, name, quantity);
    if (updated) {
      const product = await model.getProductOrSaleById(id, 'products');
      return res.status(200).json(product);
    }
  },
);

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await model.getProductOrSaleById(id, 'products');
  if (!product) {
    return res.status(422).json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
  }
  const deleted = await model.removeProductOrSale(id, 'products');
  if (deleted) {
    return res.status(200).json(product);
  }
});

module.exports = router;
