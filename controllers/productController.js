const express = require('express');
const productService = require('../services/productService');
const route = express.Router();

// Cadastro de produtos
route.post('/products', async (req, res, _next) => {
  const { name, quantity } = req.body;
  try {
    const resultOfAddingProduct = await productService.addAProduct(name, quantity);
    const keysOfResult = Object.keys(resultOfAddingProduct);

    if (keysOfResult && keysOfResult[0] === 'err') {
      res.status(422).json(resultOfAddingProduct);
    }

    if (resultOfAddingProduct) {
      res.status(201).json(resultOfAddingProduct);
    }
  } catch (error) {
    res.status(500);
  }
});

module.exports = route;
