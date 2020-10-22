const express = require('express');
const { validations } = require('../service');
const { productController } = require('../controller');

const productRouter = express.Router();

productRouter.get('/', productController.getAllProdController);
productRouter.post(
  '/',
  validations.validationExistProd,
  validations.validationNameQuantity,
  productController.registerProdController,
);

productRouter.get('/:id', productController.getProdByIdController);
productRouter.put(
  '/:id',
  validations.validationNameQuantity,
  validations.validationNameUpdate,
  productController.updateProductController,
);

module.exports = productRouter;
