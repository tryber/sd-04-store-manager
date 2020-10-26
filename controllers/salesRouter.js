const { Router } = require('express');
const controller = require('./salesController');
const { validateSale } = require('../middlewares/validateSales');

const salesRouter = Router();

salesRouter
  .route('/')
  .post(validateSale, controller.insertSalesCont)
  .get(controller.getAllSalesCont);

salesRouter
  .route('/:id')
  .get(controller.getByIdSalesCont)
  .put(validateSale, controller.updateByIdSalesCont)
  .delete(controller.deleteSalesCont);

module.exports = salesRouter;
