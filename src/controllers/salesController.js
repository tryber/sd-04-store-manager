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
  res.status(200);
});
