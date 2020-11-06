const router = require('express').Router();

const { addSale, getAllSales, getSaleById } = require('../models/salesModel');

router.post('/', async ({ body }, res) => {
  const sale = await addSale(body);
  const qty = sale.itensSold[0].quantity;

  const err = { code: 'invalid_data' };
  if (qty <= 0 || typeof qty !== 'number') {
    err.message = 'Wrong product ID or invalid quantity';
  };

  err.message ? res.status(422).json({ err }) : res.status(200).json(sale);
});

router.get('/', async (_req, res) => {
  const sales = await getAllSales();
  
  res.status(200).json({ sales });
});

router.get('/:id', async (req, res) => {
  const { id } = req.body
  const sale = await getSaleById(id);

  const err = { err: { code: 'not_found', message: 'Sale not found' } };
  if (!sale) return res.status(404).json({ err });
  res.status(200).json(sale);
});

module.exports = router;
