/** PRODUCTS ROUTES */

const express = require('express');

const router = express.Router();

const middlewares = require('../middlewares');
const controllers = require('../controllers');

router.get('/:id', controllers.productsController.getProduct);
router.delete('/:id', controllers.productsController.deleteProduct);
router.put(
  '/:id',
  middlewares.validateMiddleware.productsDataRules(),
  middlewares.validateMiddleware.validateData,
  controllers.productsController.updateProduct,
);
router.get('/', controllers.productsController.listProducts);
router.post(
  '/',
  middlewares.validateMiddleware.productsDataRules(),
  middlewares.validateMiddleware.validateData,
  controllers.productsController.createProduct,
);

module.exports = router;
