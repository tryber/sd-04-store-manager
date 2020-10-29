const express = require('express');
const validator = require('../service/validator');
const productModel = require('../models/productModel');

const router = express.Router();

router.post('/', validator.validateSales, async (req, res) => {
  const document = {
    itensSold: req.body,
  };
  const insertedSales = await productModel.createOne('sales', document);
  res.status(200).json(insertedSales);
});

router.get('/', async (_req, res) => {
  const sales = await productModel.findAll('sales');
  res.status(200).json({ sales });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const sale = await productModel.findById('sales', id);
  res.status(200).json(sale);
});
