const express = require('express');
const productsModel = require('../models/productsModel');
const router = express.Router();

router.get('/', async (res, _req) => {
  const products = await productsModel.getAll();
  res.json(products);
});

module.exports = {

}