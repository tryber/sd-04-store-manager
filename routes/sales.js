/** PRODUCTS ROUTES */

const express = require('express');

const router = express.Router();

const middlewares = require('../middlewares');
const controllers = require('../controllers');

router.get('/:id', controllers.salesController.getSale);
router.put(
  '/:id',
  middlewares.validateMiddleware.validateSale,
  controllers.salesController.updateSales,
);
router.delete('/:id', controllers.salesController.deleteSales);
router.get('/', controllers.salesController.listSales);
router.post(
  '/',
  middlewares.validateMiddleware.validateSale,
  controllers.salesController.createSale,
);

module.exports = router;
