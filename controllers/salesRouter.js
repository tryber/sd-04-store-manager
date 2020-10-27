const { Router } = require('express');
const controller = require('./salesController');
const validateSale = require('../middlewares/validateSales');

const salesRouter = Router();

salesRouter
  .route('/')
  .post(validateSale.validateSaleQuant, validateSale.validateSaleNumber, controller.insertSalesCont)
  .get(controller.getAllSalesCont);

salesRouter
  .route('/:id')
  .get(controller.getByIdSalesCont)
  .put(
    validateSale.validateSaleQuant,
    validateSale.validateSaleNumber,
    controller.updateByIdSalesCont,
  )
  .delete(controller.deleteSalesCont);

module.exports = salesRouter;
