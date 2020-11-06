const express = require('express');
const productsModel = require('../models/productsModel');
const { buildResponse } = require('../middlewares/productsValidation');
const productsValidation = require('../middlewares/productsValidation');

const route = express.Router();

// Posting a product on the DB
route.post('/',
  productsValidation.validateNameLength,
  productsValidation.validateProductExistsByName,
  productsValidation.validateQuantity,
  async (req, res) => {
    try {
      const { name, quantity } = req.body;
      const postingProductOnDB = await productsModel.addProduct(name, quantity);
      res.status(201).json(postingProductOnDB);
    } catch (error) {
      res.status(500).json(buildResponse('invalid_data', 'Error registering product'));
    }
  });

// Updating a product on the DB
route.put('/:id',
  productsValidation.validateNameLength,
  productsValidation.validateQuantity,
  productsValidation.validateProductExistsByName,
  productsValidation.validateProductExistsById,
  async (req, res, _next) => {
    try {
      const { id } = req.params;
      const { name, quantity } = req.body;
      await productsModel.updateValues(id, name, quantity);
      const updatingProductOnDB = await productsModel.findById(id);
      res.status(200).json(updatingProductOnDB);
    } catch (error) {
      res.status(500).json(buildResponse('invalid_data', 'Error updating product'));
    }
  });

// Deleting a product
route.delete('/:id',
  async (req, res, _next) => {
    try {
      const { id } = req.params;
      const deletedItem = await productsModel.findById(id);
      await productsModel.deleteById(id);
      res.status(200).json(deletedItem);
    } catch (error) {
      res.status(422).json(buildResponse('invalid_data', 'Wrong id format'));
    }
  });

// Listing a product
route.get('/',
  async (_req, res, _next) => {
    try {
      const ItemsList = await productsModel.findAll();
      if (ItemsList) {
        res.status(200).json(ItemsList);
      }
    } catch (error) {
      res.status(404).json(buildResponse('not_found', 'Page not found'));
    }
  });

// Listing a product by id
route.get('/:id',
  async (req, res, _next) => {
    try {
      const { id } = req.params;
      const productResult = await productsModel.findById(id);
      res.status(200).json(productResult);
    } catch (error) {
      res.status(422).json(buildResponse('invalid_data', 'Wrong id format'));
    }
  });

module.exports = route;
