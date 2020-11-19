const express = require('express');
const validations = require('../middlewares/inputValidations');
const crudModel = require('../models/crudModel');

const router = express.Router();

router.get('/', async (_req, res) => {
  crudModel.findAll('sales').then((sales) => res.status(200).json({ sales }));
});

router.post(
  '/',
  validations.validateSalesQuantity,
  validations.validateQuantityIsNumber,
  async (req, res) => {
    const [...itensSold] = req.body;
    const sales = await crudModel.addSale(itensSold);
    res.status(200).json(sales);
  },
);

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const sale = await crudModel.findById('sales', id);
  if (!sale) {
    return res.status(404).json({ err: { code: 'not_found', message: 'Sale not found' } });
  }
  res.status(200).json(sale);
});

module.exports = router;
