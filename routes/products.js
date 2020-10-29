const express = require('express');
const controller = require('../controller/product');
const middleware = require('../middleware/error');

const routers = express.Router();

routers
  .post('/', middleware.authProduct, controller.postNewProduct)
  .get('/', controller.getAllProducts)
  .get('/:id', controller.getProductById)
  .put('/:id', controller.putProduct)
  .delete('/:id', controller.deleteProduct);

module.exports = routers;

