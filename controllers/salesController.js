const router = require('express').Router();
const salesModel = require('../models/salesModel');
const salesService = require('../services/salesService');

router.post('/', async (req, res) => {
  const item = req.body;
  const sale = await salesModel.addSale(item);
  const quantity = sale.itensSold[0].quantity;

  const err = { code: 'invalid_data' };
  if (quantity <= 0 || typeof quantity === 'string') {
    err.message = 'Wrong product ID or invalid quantity';
  }

  if (err.message) return res.status(422).json({ err });
  return res.status(200).json(sale);
});

router.get('/', async (_req, res) => {
  const sales = await salesService.getAll();

  res.status(200).json({ sales });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const err = { err: { code: 'not_found', message: 'Sale not found' } };

  const sale = await salesModel.getSaleById(id);

  if (!sale) return res.status(404).json(err);

  res.status(200).json(sale);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;

  const [itensSold] = req.body;
  const err = { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' };

  if (itensSold.quantity <= 0 || typeof itensSold.quantity === 'string') {
    return res.status(422).json({ err });
  }

  const [...saleUpdate] = req.body;

  await salesModel.updateSale(id, saleUpdate);
  const updatedSale = await salesModel.getSaleById(id);
  res.status(200).json(updatedSale);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.deleteSale(id);
  const err = { err: { code: 'invalid_data', message: 'Wrong sale ID format' } };

  if (!sale) return res.status(422).json(err);
  res.status(200).json(sale);
});

module.exports = router;
