const { Router } = require('express');
const controller = require('./productsController');
const { validateProd, validateUpdateProd } = require('../middlewares/validateProduct');

const productsRouter = Router();

productsRouter
  .post('/', validateProd, controller.insertProdCont)
  .get('/', controller.listAllProdCont)
  .get('/:id', controller.listByIdProdCont)
  .put('/:id', validateUpdateProd, controller.updateByIdProdCont)
  .delete('/:id', controller.deleteProdCont);

module.exports = productsRouter;
