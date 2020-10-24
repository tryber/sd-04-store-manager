const express = require('express');
const { validationsProducts } = require('../services');
const { productController } = require('../controllers');

const productRouter = express.Router();

productRouter.get('/', productController.getAllProdController);
productRouter.post(
  '/',
  validationsProducts.validationExistProd,
  validationsProducts.validationNameQuantity,
  productController.createProdController,
);

productRouter.get('/:id', productController.getProdByIdController);

module.exports = {
  productRouter,
};
