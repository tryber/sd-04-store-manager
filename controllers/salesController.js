const express = require('express');
const saleService = require('../services/salesService');

const router = express.Router();

router.post('/', async (req, res) => {
  const item = req.body;
  const sale = await saleService.createSale(item);

  if (sale.error) return res.status(422).json({ err: sale.err });
  return res.status(200).json(sale);
});

router.get('/', async (req, res) => {
  const sale = await saleService.getAll();
  res.status(200).json(sale);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const sale = await saleService.getById(id);

  if (sale.error) return res.status(404).json({ err: sale.err });
  res.status(200).json(sale);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const saleUpdate = req.body;
  const sale = await saleService.updateSale(id, saleUpdate);

  if (sale.error) return res.status(422).json({ err: sale.err });
  return res.status(200).json(sale);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const sale = await saleService.deleteSale(id);

  if (!sale) return res.status(422).json({ err: sale.err });
  res.status(200).json(sale);
});

module.exports = router;
