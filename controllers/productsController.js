const express = require('express');
const productsModel = require('../models/productsModel');
const productValidation = require('../middlewares/products');

const router = express.Router();

router.get('/', async (_req, res) => {
  const products = await productsModel.getProducts();
  res.status(200).json({ products });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await productsModel.getProductById(id);

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
    const product = await productsModel.addProduct(name, quantity);
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
    const updated = await productsModel.updateProduct(id, name, quantity);
    if (updated) {
      const product = await productsModel.getProductById(id);
      return res.status(200).json(product);
    }
  },
);

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await productsModel.getProductById(id);
  const deleted = await productsModel.removeProduct(id);
  if (deleted) {
    return res.status(200).json(product);
  }
  return res.status(422).json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
});

module.exports = router;
