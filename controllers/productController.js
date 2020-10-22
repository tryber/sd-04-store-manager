const express = require('express');
const productService = require('../services/productService');

const route = express.Router();

// Deleta um produto
route.delete('/products/:id', async (req, res, _next) => {
  const { id } = req.params;
  try {
    const deletedResult = await productService.deleteAProduct(id);
    const keysOfResult = Object.keys(deletedResult);

    if (keysOfResult && keysOfResult[0] === 'err') {
      res.status(422).json(deletedResult);
    }

    if (deletedResult) {
      res.status(200).json(deletedResult);
    }
  } catch (error) {
    res.status(500);
  }
});

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
route.get('/products/:id', async (req, res, _next) => {
  const { id } = req.params;
  try {
    const productResult = await productService.showASpecificProductById(id);
    const keysOfResult = Object.keys(productResult);

    if (keysOfResult && keysOfResult[0] === 'err') {
      res.status(422).json(productResult);
    }

    if (productResult) {
      res.status(200).json(productResult);
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

// Atualiza um produto
route.put('/products/:id', async (req, res, _next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  try {
    const updateResult = await productService.updateAProduct(id, name, quantity);
    const keysOfResult = Object.keys(updateResult);

    if (keysOfResult && keysOfResult[0] === 'err') {
      res.status(422).json(updateResult);
    }

    if (updateResult) {
      res.status(200).json(updateResult);
    }
  } catch (error) {
    res.status(500);
  }
});

module.exports = route;
