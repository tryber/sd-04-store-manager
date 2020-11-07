const { Router } = require('express');
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');
const { errorHandler, verifyId, verifySaleId } = require('./services/errorHandler');

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

routes.delete(
  '/products/:id',
  verifyId,
  productsController.deleteProduct,
  errorHandler,
);

routes.post('/sales', salesController.addNewSale, errorHandler);

routes.get('/sales', salesController.listSales);

routes.get(
  '/sales/:id',
  salesController.getSalesById,
);

routes.put(
  '/sales/:id',
  verifyId,
  salesController.updateSale,
  errorHandler,
);

routes.delete(
  '/sales/:id',
  verifySaleId,
  salesController.deleteSales,
  errorHandler,
);

module.exports = routes;
