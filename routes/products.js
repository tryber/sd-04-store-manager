/** PRODUCTS ROUTES */

const express = require('express');

const router = express.Router();

// const middlewares = require('../middlewares');
const controllers = require('../controllers');

router.get('/', controllers.productsController.listProducts);

module.exports = router;
