const { Router } = require('express');
const controller = require('./salesController');
const { validateSaleQuant, validateSaleNumber } = require('../middlewares/validateSales');

const salesRouter = Router();

salesRouter
  .route('/')
  .post(validateSaleQuant, validateSaleNumber, controller.insertSalesCont)
  .get(controller.getAllSalesCont);

salesRouter
  .route('/:id')
  .get(controller.getByIdSalesCont)
  .put(validateSaleQuant, validateSaleNumber, controller.updateByIdSalesCont)
  .delete(controller.deleteSalesCont);

module.exports = salesRouter;
