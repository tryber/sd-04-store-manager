const express = require('express');
const salesService = require('../services/salesService');

const route = express.Router();

// Cadastro de vendas
route.post('/sales', async (req, res, _next) => {
  try {
    const resultOfAddingASale = await salesService.addSales(req.body);
    const keysOfResult = Object.keys(resultOfAddingASale);

    if (keysOfResult && keysOfResult[0] === 'err') {
      res.status(422).json(resultOfAddingASale);
    }

    if (resultOfAddingASale) {
      res.status(200).json(resultOfAddingASale);
    }
  } catch (error) {
    res.status(500);
  }
});

module.exports = route;
