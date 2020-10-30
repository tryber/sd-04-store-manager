/** PRODUCTS ROUTES */

const express = require('express');

const router = express.Router();

const middlewares = require('../middlewares');
const controllers = require('../controllers');

router.post(
  '/',
  middlewares.validateMiddleware.validateSale,
  controllers.salesController.createSale,
);

module.exports = router;
