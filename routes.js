const { Router } = require('express');
const productsController = require('./controllers/productsController');

const routes = Router();

routes.get('/products', productsController.listProducts);
routes.post('/products', productsController.validateProduct, productsController.newProduct);

module.exports = routes;
