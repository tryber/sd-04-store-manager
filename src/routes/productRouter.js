const express = require('express');
const service = require('../service');
const { productController } = require('../controller');

const productRouter = express.Router();

productRouter.get('/', productController.getAllProdController);
productRouter.post('/', service.registerValid, productController.registerProdController);

module.exports = productRouter;
