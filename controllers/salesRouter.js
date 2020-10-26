const { Router } = require('express');
const controller = require('./salesController');
const { validateSale } = require('../middlewares/validateSales');

const salesRouter = Router();

salesRouter
  .post('/', validateSale, controller.insertSalesCont)
  .get('/', controller.getAllSalesCont)
  .get('/:id', controller.getByIdSalesCont)
  .put('/:id', validateSale, controller.updateByIdSalesCont)
  .delete('/:id', controller.deleteSalesCont);

module.exports = salesRouter;
