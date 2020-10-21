const express = require('express');
const controller = require('./productsController');

const productsRouter = express.Router();

productsRouter
  .route('/')
  .post('/', controller.addProdCont)
  .get('/', controller.listAllProdCont);

module.exports = productsRouter;
