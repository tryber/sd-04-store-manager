const express = require('express');
const validations = require('../middlewares/validaçoes');
const models = require('../models/models');

const router = express.Router();

router.post('/', validations.validateSales, async (req, res) => {
  const document = {
    itensSold: req.body,
  };
  const insertedSales = await models.createOne('sales', document);
  insertedSales.itensSold.forEach(async (element) => {
    await models.updateProduct('products', element.productId, -element.quantity);
  });
  res.status(200).json(insertedSales);
});

router.get('/', async (_req, res) => {
  models.findAll('sales').then((sales) => res.status(200).json({ sales }));
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const sale = await models.findById('sales', id);
  if (!sale) {
    return res.status(404).json({ err: { code: 'not_found', message: 'Sale not found' } });
  }
  res.status(200).json(sale);
});

router.put('/:id', validations.validateSales, async (req, res) => {
  const { id } = req.params;
  const document = {
    itensSold: req.body,
  };
  await models.update('sales', id, document);
  models.findById('sales', id).then((sale) => res.status(200).json(sale));
});

router.delete('/:id', validations.verifyIfSaleExistsById, async (req, res) => {
  await models.remove('sales', req.params.id);
  req.sale.itensSold.forEach(async (element) => {
    await models.updateProduct('products', element.productId, element.quantity);
  });
  res.status(200).json(req.sale);
});

module.exports = router;
