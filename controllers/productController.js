const express = require('express');
const productService = require('../services/productService');

const route = express.Router();

// Lista os produtos
route.get('/products', async (_req, res, _next) => {
  try {
    const productsList = await productService.listProducts();
    if (productsList) {
      res.status(200).json(productsList);
    }
  } catch (error) {
    res.status(500);
  }
});

// Busca um produto pelo id
route.get('/products/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await productService.showASpecificProductById(id);
    if (product) {
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(500);
  }
});

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
