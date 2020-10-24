const { Router } = require('express');
const controller = require('./salesController');
const { validateSale } = require('../middlewares/validateSales');

const salesRouter = Router();

salesRouter
  .post('/', validateSale, controller.insertSalesCont)
  .get('/', controller.getAllSalesCont)
  .get('/:id', controller.getByIdSalesCont);

module.exports = salesRouter;
