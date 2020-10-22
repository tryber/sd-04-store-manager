const { Router } = require('express');
const productsController = require('./controllers/productsController');
const { errorHandler, verifyId } = require('./services/errorHandler');

const routes = Router();

routes.get('/products', productsController.listProducts);
routes.post(
  '/products',
  productsController.validateProduct,
  productsController.newProduct,
  errorHandler,
);

routes.get(
  '/products/:id',
  verifyId,
  productsController.getProductById,
  errorHandler,
);

routes.put(
  '/products/:id',
  verifyId,
  productsController.validateProduct,
  productsController.updateProduct,
  errorHandler,
);

module.exports = routes;
