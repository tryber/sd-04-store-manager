const express = require('express');
const { validationsProducts } = require('../service');
const { productController } = require('../controller');

const productRouter = express.Router();

productRouter.get('/', productController.getAllProdController);
productRouter.post(
  '/',
  validationsProducts.validationExistProd,
  validationsProducts.validationNameQuantity,
  productController.registerProdController,
);

productRouter.get('/:id', productController.getProdByIdController);

productRouter.put(
  '/:id',
  validationsProducts.validationNameQuantity,
  validationsProducts.validationNameUpdate,
  productController.updateProductController,
);

productRouter.delete('/:id', productController.deleteProductController);

module.exports = productRouter;
