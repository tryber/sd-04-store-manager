const express = require('express');
const middlewares = require('../middlewares');
const crud = require('../models/crud');

const router = express.Router();

router.post('/',
  middlewares.validateSales,
  async (req, res) => {
    const document = {
      itensSold: req.body,
    };
    const insertedSales = await crud.create('sales', document);
    res.status(200).json(insertedSales);
  });

router.get('/', async (_req, res) => {
  crud.readAll('sales').then((sales) => res.status(200).json({ sales }));
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const sale = await crud.readById('sales', id);
  if (!sale) {
    return res.status(404).json({ err: { code: 'not_found', message: 'Sale not found' } });
  }
  res.status(200).json(sale);
});

router.put('/:id',
  middlewares.validateSales,
  async (req, res) => {
    const { id } = req.params;
    const document = {
      itensSold: req.body,
    };
    await crud.updateById('sales', id, document);
    crud.readById('sales', id).then((sale) => res.status(200).json(sale));
  });

router.delete('/:id', middlewares.verifyIfSaleExistsById, async (req, res) => {
  await crud.deleteById('sales', req.params.id);
  res.status(200).json(req.sale);
});

module.exports = router;
