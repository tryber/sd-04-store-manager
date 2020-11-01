const express = require('express');
const { salesModel } = require('../models');
const validation = require('../service/validation');

const router = express.Router();

router.post('/', validation.saleQuantity, async (req, res) => {
  try {
    const salesArray = req.body;
    const sales = await salesModel.addSales(salesArray);
    res.status(200).json(sales);
  } catch (_e) {
    res.status(501).json({ message: 'Falha ao cadastrar o produto!' });
  }
});

router.get('/', async (req, res) => {
  try {
    const sales = await salesModel.listSales();
    res.status(200).json({ sales });
  } catch (_e) {
    res.status(501).json({ message: 'Falha ao cadastrar o produto!' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await salesModel.findSaleById(id);

    if (!product) {
      return res.status(404).json({
        err: {
          code: 'not_found',
          message: 'Sale not found',
        },
      });
    }
    res.status(200).json(product);
  } catch (_e) {
    res.status(501).json({ message: 'Falha ao carregar o produto!' });
  }
});

module.exports = router;
