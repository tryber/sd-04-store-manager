const { Router } = require('express');
const controller = require('./productsController');
const { validateProd, validateUpdateProd } = require('../middlewares/validateProduct');

const productsRouter = Router();

productsRouter
  .route('/')
  .post(validateProd, controller.insertProdCont)
  .get(controller.listAllProdCont);

productsRouter
  .route('/:id')
  .get(controller.listByIdProdCont)
  .put(validateUpdateProd, controller.updateByIdProdCont)
  .delete(controller.deleteProdCont);

module.exports = productsRouter;
