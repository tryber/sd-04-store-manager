const { Router } = require('express');
const controller = require('./productsController');

const productsRouter = Router();

productsRouter.route('/').post('/', controller.addProdCont).get('/', controller.listAllProdCont);

module.exports = productsRouter;
