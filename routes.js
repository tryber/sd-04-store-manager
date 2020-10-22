const { Router } = require('express');
const productsController = require('./controllers/productsController');
const { errorHandler } = require('./services/errorHandler');

const routes = Router();

routes.get('/products', productsController.listProducts);
routes.post(
  '/products',
  productsController.validateProduct,
  productsController.newProduct,
  errorHandler
);

module.exports = routes;
