const express = require('express');
const route = express.Router();

// Cadastro de produtos
route.post('/products', (req, res, next) => {
  console.log('Cad funciona.');
});

module.exports = route;
