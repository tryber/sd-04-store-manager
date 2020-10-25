const express = require('express');
const salesModel = require('../models/salesModel');
const { buildResponse } = require('../middlewares/productsValidation');
const salesValidation = require('../middlewares/salesValidation');

const route = express.Router();

route.post('/', salesValidation.validateQuantity, async (req, res) => {
  try {
    const { body } = req;
    const sales = await salesModel.insertSale(body);
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json(buildResponse('invalid_data', 'Wrong product ID or invalid quantity'));
  }
});

// // Listing all sales
route.get('/', (_req, res, _next) => {
  salesModel
    .findAllSales()
    .then((allProductsSold) => {
      res.status(200).json({ allProductsSold });
    })
    .catch((_error) => {
      res.status(404).json(buildResponse('not_found', 'Sale not found'));
    });
});

// //  Listing a sale by id
route.get('/:id', (req, res, _next) => {
  const { id } = req.params;
  salesModel
    .findSaleById(id)
    .then((productSold) => {
      if (!productSold) {
        return res.status(404).json(buildResponse('not_found', 'Sale not found'));
      }
      res.status(200).json(productSold);
    })
    .catch((_error) => {
      res.status(422).json(buildResponse('not_found', 'Sale not found'));
    });
});

route.put('/:id', salesValidation.validateQuantity, async (req, res, _next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    await salesModel.updateSale(id, body);
    const updatingSaleOnDB = await salesModel.findSaleById(id);
    res.status(200).json(updatingSaleOnDB);
  } catch (error) {
    res.status(422).json(buildResponse('invalid_data', 'Wrong product ID or invalid quantity'));
  }
});

// //  Deleting a sale by id
route.delete('/:id', (req, res) => {
  const { id } = req.params;
  salesModel
    .findSaleById(id)
    .then((productSold) => {
      salesModel.deleteSale(id);
      res.status(200).json(productSold);
    })
    .catch((_error) => {
      res.status(422).json(buildResponse('invalid_data', 'Wrong sale ID format'));
    });
});
module.exports = route;
