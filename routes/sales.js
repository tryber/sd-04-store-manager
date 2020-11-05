const express = require('express');
const controller = require('../controller/sale');
const middleware = require('../middleware/sale');

const routers = express.Router();

routers
  .post('/', middleware.authPost, middleware.authQuantity, controller.postNewSale)
  .get('/', middleware.authSaleGet, controller.getAllSale)
  .get('/:id', middleware.authSaleGet, controller.getSaleById)
  .put('/:id', middleware.authPost, controller.putSale)
  .delete('/:id', middleware.authDelete, controller.deleteSale);

module.exports = routers;
