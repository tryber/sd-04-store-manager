const router = require('express').Router();

const { addSale, getAllSales, getSaleById, updateSaleById, deleteSaleById } = require('../models/salesModel');

router.post('/', async ({ body }, res) => {
  const sale = await addSale(body);
  const qty = sale.itensSold[0].quantity;

  const err = { code: 'invalid_data' };
  if (qty <= 0 || typeof qty !== 'number') {
    err.message = 'Wrong product ID or invalid quantity';
  }

  if (err.message) return res.status(422).json({ err });
  
  res.status(200).json(sale);
});

router.get('/', async (_req, res) => {
  const sales = await getAllSales();

  res.status(200).json({ sales });
});

router.get('/:id', async (req, res) => {
  const { id } = req.body;
  const sale = await getSaleById(id);

  const err = { code: 'not_found', message: 'Sale not found' };
  if (!sale) return res.status(404).json({ err });
  res.status(200).json(sale);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const [itensSold] = req.body;

  const err = { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' };

  if (itensSold.quantity <= 0 || typeof itensSold.quantity !== 'number') {
    return res.status(422).json({ err });
  }

  const [...upSale] = req.body;

  await updateSaleById(id, upSale);

  const updatedSale = await getSaleById(id);
  res.status(200).json(updatedSale);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const sale = await getSaleById(id);

  if (!sale) return res.status(422).json({ err: { code: 'invalid_data', message: 'Wrong sale ID format' } });

  if (sale === {}) return res.status(404).json({ err: { code: 'not_found', message: 'Sale not found' } });

  await deleteSaleById(id);

  return res.status(200).json(sale);
});

module.exports = router;
