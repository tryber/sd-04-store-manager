const express = require('express');
const controller = require('../controller/product');
const middleware = require('../middleware/product');

const routers = express.Router();

routers
  .post('/', middleware.authPost, controller.postNewProduct)
  .get('/', middleware.authGet, controller.getAllProducts)
  .get('/:id', middleware.authGet, controller.getProductById)
  .put('/:id', middleware.authPut, controller.putProduct)
  .delete('/:id', middleware.authDelete, controller.deleteProduct);

module.exports = routers;
