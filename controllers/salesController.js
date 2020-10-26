const express = require('express');
const SalesModel = require('../models/salesModel');
const SalesService = require('../services/salesServices');

const router = express.Router();

// SalesModel = require('../models/salesModel');

// CRIA NOVA VENDA---------------------------------------------------------------------
router.post('/', async (req, res) => {
  //   try {
  const sale = req.body;
  const createdSale = await SalesModel.createSale(sale);
  // console.log(createdSale);
  //   console.log(sale);
  const quantity = createdSale.itensSold[0].quantity;
  // console.log(createdSale.itensSold[0].quantity);

  const err = { code: 'invalid_data' };
  if (quantity < 0 || quantity === 0 || typeof quantity === 'string')
    err.message = 'Wrong product ID or invalid quantity';

  if (err.message) return res.status(422).json({ err });
  return res.status(200).json(createdSale);
  //   } catch (err) {
  //     console.error(err);
  //     process.exit(1);
  //   }
});

// RETORNA TODAS AS VENDAS-------------------------------------------------------------------
router.get('/', async (_req, res) => {
  const sales = await SalesModel.getAllSales();
  res.status(200).json({ sales });
});

// RETORNA OS VENDAS POR ID------------------------------------------------------------------
router.get('/:id', async (req, res) => {
  //   try {
  const { id } = req.params;
  const sale = await SalesModel.getSaleById(id);
  const err = { err: { code: 'not_found', message: 'Sale not found' } };

  if (!sale) return res.status(404).json({ err });
  res.status(200).json(sale);
  //   } catch (err) {
  //     process.exit(1);
  //   }
});

// // ATUALIZA UMA VENDA -------------------------------------------------------------------------

// DELETA UMA VENDA -------------------------------------------------------------------------
router.delete('/:id', async (req, res) => {
  //   try {
  const { id } = req.params;
  const sale = await SalesModel.getSaleById(id);
  // const deletedSale = await SalesModel.deleteSale(id);
  // console.log(deletedSale)

  const err = { code: 'invalid_data', message: 'Wrong sale ID format' };
  const deletedErr = { err: { code: 'not_found', error: 'not_found', message: 'Sale not found' } };

  if (!sale) return res.status(422).json({ err });
  await SalesModel.deleteSale(id);

  return res.status(200).json(deletedErr);
  //   } catch (err) {
  //     process.exit(1);
  //   }
});

module.exports = router;
