const express = require('express');
const { validations } = require('../service');
const { productController } = require('../controller');

const productRouter = express.Router();

productRouter.get('/', productController.getAllProdController);
productRouter.post(
  '/',
  validations.validationNameQuantity,
  validations.validationExistProd,
  productController.registerProdController,
);

productRouter.get('/:id', productController.getProdByIdController);
productRouter.put(
  '/:id',
  validations.validationNameQuantity,
  productController.updateProductController,
);

module.exports = productRouter;
