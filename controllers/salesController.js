const express = require('express');
const salesService = require('../services/salesService');

const route = express.Router();

// Deleta uma venda
route.delete('/sales/:id', async (req, res, _next) => {
  try {
    const deletedResult = await salesService.deleteASale(req.params.id);
    const keysOfResult = Object.keys(deletedResult);

    if (keysOfResult && keysOfResult[0] === 'err') {
      res.status(422).json(deletedResult);
    }

    if (deletedResult) {
      res.status(200).json(deletedResult);
    }
  } catch (error) {
    res.status(500);
  }
});

// Lista as vendas
route.get('/sales', async (_req, res, _next) => {
  const salesList = await salesService.listSales();
  try {
    if (salesList) {
      res.status(200).json(salesList);
    }
  } catch (error) {
    res.status(500);
  }
});

// Busca uma venda pelo id
route.get('/sales/:id', async (req, res, _next) => {
  const { id } = req.params;
  const saleResult = await salesService.showASpecificSaleById(id);
  try {
    const keysOfResult = Object.keys(saleResult);
    if (keysOfResult && keysOfResult[0] === 'err') {
      res.status(404).json(saleResult);
    }

    if (saleResult) {
      res.status(200).json(saleResult);
    }
  } catch (error) {
    res.status(500);
  }
});

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

route.put('/sales/:id', async (req, res, _next) => {
  try {
    const { id } = req.params;
    const itensSold = req.body;
    const updateResult = await salesService.updateASale(id, itensSold);
    const keysOfResult = Object.keys(updateResult);

    if (keysOfResult && keysOfResult[0] === 'err') {
      res.status(422).json(updateResult);
    }

    if (updateResult) {
      res.status(200).json(updateResult);
    }
  } catch (error) {
    res.status(500);
  }
});

module.exports = route;
