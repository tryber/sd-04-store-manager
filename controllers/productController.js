const express = require('express');
const crudModel = require('../models/crudModel');
const validations = require('../middlewares/validations');
const { verifyIfExists, validateQuantity } = require('../middlewares/validations');

const router = express.Router();

router.post('/', validations.validateName, verifyIfExists, validateQuantity, async (req, res) => {
  const { name, quantity } = req.body;
  try {
    const insertedProduct = await crudModel.createOne('products', name, quantity);
    res.status(201).json(insertedProduct);
  } catch (err) {
    res.status(500).json({ err });
  }
});

module.exports = router;
