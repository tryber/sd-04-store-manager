const express = require('express');
const productsModel = require('../models/productsModel');
const productVerify = require('../middlewares/productsVerify');
const index = require('../models/index');

const { nameExistsVerify, nameLengthVerify, quantityVerify, numberQuantityVerify } = productVerify;

const router = express.Router();

router.post(
  '/',
  nameLengthVerify,
  nameExistsVerify,
  quantityVerify,
  numberQuantityVerify,
  async (req, res) => {
    try {
      const { name, quantity } = req.body;

      const product = await productsModel.addProduct(name, quantity);
      res.status(201).json(product);
    } catch (_e) {
      console.log(_e.message);
    }
  },
);

router.put('/:id', nameLengthVerify, quantityVerify, numberQuantityVerify, async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const { id } = req.params;

    await productsModel.updateProduct(id, name, quantity);
    const product = await index.getById(id, 'products');
    res.status(200).json(product);
  } catch (_e) {
    console.log(_e.message);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const productToDelete = await index.getById(id, 'products');
  const errorMessage = {
    err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    },
  };
  if (!productToDelete) return res.status(422).json(errorMessage);
  await index.deleteProduct(id, 'products');
  res.status(200).json(productToDelete);
});

router.get('/', async (req, res) => {
  const products = await productsModel.getAll();
  return res.json({ products });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await index.getById(id, 'products');
  const errorMessage = {
    err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    },
  };
  if (!product) return res.status(422).json(errorMessage);

  return res.status(200).json(product);
});

module.exports = router;
