const express = require('express');
const validations = require('../middlewares/inputValidations');
const crudModel = require('../models/crudModel');
const quantityService = require('../service/quantityService');

const router = express.Router();

router.post(
  '/',
  validations.validateSalesQuantity,
  validations.validateQuantityIsNumber,
  async (req, res) => {
    const [...itensSold] = req.body;
    const sales = await crudModel.addSale(itensSold);
    await quantityService.updateProductQuantity(req.method, itensSold);
    res.status(200).json(sales);
  },
);

router.get('/', async (_req, res) => {
  crudModel.findAll('sales').then((sales) => res.status(200).json({ sales }));
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const sale = await crudModel.findById('sales', id);
  if (!sale) {
    return res.status(404).json({ err: { code: 'not_found', message: 'Sale not found' } });
  }
  res.status(200).json(sale);
});

router.put(
  '/:id',
  validations.validateSales,
  validations.validateSalesQuantity,
  validations.validateQuantityIsNumber,
  validations.verifySaleById,
  async (req, res) => {
    const { id } = req.params;
    const document = {
      itensSold: req.body,
    };
    await crudModel.update('sales', id, document);
    crudModel.findById('sales', id).then((sale) => res.status(200).json(sale));
  },
);

router.delete('/:id', validations.verifySaleById, async (req, res) => {
  await crudModel.remove('sales', req.params.id);
  const { id } = req.params;
  const sale = await crudModel.findById('sales', id);
  await quantityService.updateProductQuantity(req.method, sale.itensSold);
  res.status(200).json(req.sale);
});

module.exports = router;
