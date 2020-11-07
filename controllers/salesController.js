const express = require('express');

const SalesModel = require('../models/salesModel');

const router = express.Router();

// CRIA NOVA VENDA---------------------------------------------------------------------
router.post('/', async (req, res) => {
  const sale = req.body;
  const createdSale = await SalesModel.createSale(sale);
  const quantity = createdSale.itensSold[0].quantity;

  const err = { code: 'invalid_data' };
  if (quantity <= 0 || typeof quantity === 'string') {
    err.message = 'Wrong product ID or invalid quantity';
  }

  if (err.message) return res.status(422).json({ err });
  return res.status(200).json(createdSale);
});

// RETORNA TODAS AS VENDAS-------------------------------------------------------------------
router.get('/', async (_req, res) => {
  const sales = await SalesModel.getAllSales();
  res.status(200).json({ sales });
});

// RETORNA OS VENDAS POR ID------------------------------------------------------------------
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const sale = await SalesModel.getSaleById(id);
  const err = { err: { code: 'not_found', message: 'Sale not found' } };

  if (!sale) return res.status(404).json({ err });
  res.status(200).json(sale);
});

// // ATUALIZA UMA VENDA -------------------------------------------------------------------------
router.put('/:id', async (req, res) => {
  const { id } = req.params;

  const [itensSold] = req.body;
  const err = { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' };
  if (itensSold.quantity <= 0 || typeof itensSold.quantity === 'string') {
    return res.status(422).json({ err });
  }

  const [...saleUpdate] = req.body;

  await SalesModel.updateSale(id, saleUpdate);
  const updatedSale = await SalesModel.getSaleById(id);
  res.status(200).json(updatedSale);
});

// // DELETA UMA VENDA -------------------------------------------------------------------------

module.exports = router;
