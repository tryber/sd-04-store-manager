const express = require('express');
const salesModel = require('../models/salesModel');
const { buildResponse } = require('../middlewares/productsValidation');
const salesValidation = require('../middlewares/salesValidation');

const route = express.Router();

route.post('/',
  salesValidation.validateQuantity,
  async (req, res) => {
    try {
      // const { productId, quantity } = req.body;
      const { body } = req;
      // const sales = await salesModel.insertSale(productId, quantity);
      const sales = await salesModel.insertSale(body);
      res.status(200).json(sales);
    } catch (error) {
      res.status(500).json(buildResponse('invalid_data', 'Error registering sale'));
    }
  });

// Listing all sales
route.get('/',
  async (_req, res, _next) => {
    try {
      const allProductsSold = await salesModel.findAllSales();
      if (allProductsSold) {
        res.status(200).json(allProductsSold);
      }
    } catch (error) {
      res.status(404).json(buildResponse('not_found', 'Sale not found'));
    }
  });

//  Listing a salle by id
route.get('/:id', async (req, res, _next) => {
  try {
    const { id } = req.params;
    const productSold = await salesModel.findSaleById(id);
    res.status(200).json(productSold);
  } catch (error) {
    res.status(422).json(buildResponse('invalid_data', 'Wrong sale ID format'));
  }
});

route.put('/:id',
  salesValidation.validateQuantity,
  async (req, res, _next) => {
    try {
      const { id } = req.params;
      const { body } = req;
      await salesModel.updateSale(body);
      const updatingSaleOnDB = await salesModel.findSaleById(id);
      res.status(200).json(updatingSaleOnDB);
    } catch (error) {
      res.status(422).json(buildResponse('invalid_data', 'Wrong product ID or invalid quantity'))
    }
  });

module.exports = route;
