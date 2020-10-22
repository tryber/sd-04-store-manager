const express = require('express');
const model = require('../models/model');
const handleQuantity = require('../middlewares/sales');

const router = express.Router();

router.get('/', async (_req, res) => {
  const sales = await model.getProductsOrSales('sales');
  res.status(200).json({ sales });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const sale = await model.getProductOrSaleById(id, 'sales');
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
  const sales = await model.addSale(products);
  res.status(200).json(sales);
});

router.put('/:id', handleQuantity.validateQuantity, async (req, res) => {
  const { id } = req.params;
  const [product] = req.body;
  const updated = await model.updateSale(id, product.productId, product.quantity);
  if (updated) {
    const sale = await model.getProductOrSaleById(id, 'sales');
    return res.status(200).json(sale);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const sale = await model.getProductOrSaleById(id, 'sales');
  if (!sale) {
    return res.status(422).json({ err: { code: 'invalid_data', message: 'Wrong sale ID format' } });
  }
  const deleted = await model.removeProductOrSale(id, 'sales');
  if (deleted) {
    return res.status(200).json(sale);
  }
});

module.exports = router;
