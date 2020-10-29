const express = require('express');
const { productModel } = require('../models');
const validator = require('../service/validator');

const router = express.Router();

router.post('/', validator.validateProduct, async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const product = await productModel.createOne(name, quantity);

    res.status(201).json(product);
  } catch (_e) {
    console.log(_e);
    res.status(501).json({ message: 'Falha ao cadastrar o produto!' });
  }
});

router.get('/', async (req, res) => {
  try {
    const productsList = await productModel.findAll();

    res.status(200).json(productsList);
  } catch (_e) {
    console.log(_e);
    res.status(501).json({ message: 'Falha ao carregar os produtos!' });
  }
});

router.get('/:id', validator.validateProductById, async (req, res) => {
  res.status(200).json(req.product);
});

module.exports = router;
