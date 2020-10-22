const { Router } = require('express');
const controller = require('./productsController');
const { validateProd/* , validatProductId */ } = require('../middlewares/validateProduct');

const productsRouter = Router();

productsRouter
  .post('/', validateProd, controller.addProdCont)
  .get('/', controller.listAllProdCont)
  .get('/:id', /* validatProductId, */ controller.listByIdProdCont);

module.exports = productsRouter;
