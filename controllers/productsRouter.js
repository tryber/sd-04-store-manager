const { Router } = require('express');
const controller = require('./productsController');
const { validateProd } = require('../middlewares/validateProduct');

const productsRouter = Router();

productsRouter.post('/', validateProd, controller.addProdCont).get('/', controller.listAllProdCont);

module.exports = productsRouter;
