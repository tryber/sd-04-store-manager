const express = require('express');
const model = require('../models/commonModel');

const router = express.Router();

router.get('/', async (_, res) => {
  const products = await model.getAll('products');
  res.status(200).json({ products });
});

module.exports = router;
