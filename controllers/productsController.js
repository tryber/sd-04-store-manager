const express = require('express');
const productsModel = require('../models/productsModel');
const productVerify = require('../middlewares/productsVeriry');

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
    const product = await productsModel.getById(id);
    res.status(200).json(product);
  } catch (_e) {
    console.log(_e.message);
  }
});

router.get('/', async (req, res) => {
  const products = await productsModel.getAll();
  return res.json({ products });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await productsModel.getById(id);
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
