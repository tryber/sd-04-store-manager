const express = require('express');
const productsModel = require('../models/productsModel');

const router = express.Router();

router.get('/', async (_req, res) => {
  const products = await productsModel.getProducts();

  res.json(products);
});

module.exports = router;
