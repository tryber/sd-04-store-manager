const express = require('express');
const salesModel = require('../models/salesModel');
const handleQuantity = require('../middlewares/sales');

const router = express.Router();

router.get('/', async (_req, res) => {
  const sales = await salesModel.getSales();
  res.status(200).json({ sales });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const sale = await salesModel.getSaleById(id);
  if (sale) {
    return res.status(200).json(sale);
  }
  return res.status(404).json({
    err: {
      code: 'not_found',
      message: 'Sale not found',
    },
  });
});

router.post('/', handleQuantity.validateQuantity, async (req, res) => {
  const products = req.body;
  const sales = await salesModel.addSale(products);
  res.status(200).json(sales);
});

router.put('/:id', handleQuantity.validateQuantity, async (req, res) => {
  const { id } = req.params;
  const [product] = req.body;
  const updated = await salesModel.updateSale(id, product.productId, product.quantity);
  if (updated) {
    const sale = await salesModel.getSaleById(id);
    return res.status(200).json(sale);
  }
});

module.exports = router;
