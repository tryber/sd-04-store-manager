const express = require('express');
const controller = require('../controller/sale');
const middleware = require('../middleware/sale');
const productMiddleware = require('../middleware/product');

const routers = express.Router();

routers
  .post('/', middleware.authPost, middleware.authQuantity, controller.postNewSale)
  .get('/', productMiddleware.authGet, controller.getAllSale)
  .get('/:id', productMiddleware.authGet, controller.getSaleById)
  .put('/:id', middleware.authPost, controller.putSale)
  .delete('/:id', middleware.authDelete, controller.deleteSale);

module.exports = routers;
