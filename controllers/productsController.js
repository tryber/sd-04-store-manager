const express = require('express');
const productsService = require('../services/productsService');
const { validationProducts } = require('../middlewares/validationsProduct');

const route = express.Router();

// Posting a product on the DB
route.post('/', validationProducts, async (req, res, _next) => {
  try {
    const { name, quantity } = req.body;
    const postingProductOnDB = await productsService.addingProduct(name, quantity);
    const newProductKey = Object.keys(postingProductOnDB);

    if (newProductKey && newProductKey[0] === 'err') {
      res.status(422).json(postingProductOnDB);
    }

    if (postingProductOnDB) {
      res.status(201).json(postingProductOnDB);
    }
  } catch (error) {
    res.status(500);
  }
});

// Updating a product on the DB
route.put('/products/:id', async (req, res, _next) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const updatingProductOnDB = await productsService.updatingProduct(id, name, quantity);
    const productKey = Object.keys(updatingProductOnDB);

    if (productKey && productKey[0] === 'err') {
      res.status(422).json(updatingProductOnDB);
    }

    if (updatingProductOnDB) {
      res.status(200).json(updatingProductOnDB);
    }
  } catch (error) {
    res.status(500);
  }
});

// Deleting a product
route.delete('/products/:id', async (req, res, _next) => {
  try {
    const { id } = req.params;
    const deletedItem = await productsService.deletingProduct(id);
    const productKey = Object.keys(deletedItem);

    if (productKey && productKey[0] === 'err') {
      res.status(422).json(deletedItem);
    }

    if (deletedItem) {
      res.status(200).json(deletedItem);
    }
  } catch (error) {
    res.status(500);
  }
});

// Listing a product
route.get('/products', async (_req, res, _next) => {
  try {
    const ItemsList = await productsService.listingAllProducts();
    if (ItemsList) {
      res.status(200).json(ItemsList);
    }
  } catch (error) {
    res.status(500);
  }
});

// Busca um produto pelo id
route.get('/products/:id', async (req, res, _next) => {
  try {
    const { id } = req.params;
    const productResult = await productsService.showASpecificProductById(id);
    const productKey = Object.keys(productResult);

    if (productKey && productKey[0] === 'err') {
      res.status(422).json(productResult);
    }

    if (productResult) {
      res.status(200).json(productResult);
    }
  } catch (error) {
    res.status(500);
  }
});

module.exports = route;
