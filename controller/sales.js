const express = require('express');
const validate = require('../middleware/validate');
const crud = require('../model');
const quantityService = require('../service/quantity');

const router = express.Router();

router.post(
  '/',
  validate.salesQuantityIsNumber,
  validate.salesQuantityIsNot0OrLess,
  validate.quantityIsNot0OrLess,
  async (req, res) => {
    const [...itensSold] = req.body;
    const sales = await crud.create('sales', { itensSold });
    await quantityService.updateProductQuantity(req.method, itensSold);
    res.status(200).json(sales);
  },
);

router.get('/', async (_req, res) => {
  crud.read('all', null, 'sales').then((sales) => res.status(200).json({ sales }));
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const sale = await crud.read('id', id, 'sales');
  if (!sale) {
    return res.status(404).json({ err: { code: 'not_found', message: 'Sale not found' } });
  }
  res.status(200).json(sale);
});

router.put(
  '/:id',
  validate.salesProductIdAndQuantity,
  validate.salesQuantityIsNumber,
  validate.salesQuantityIsNot0OrLess,
  validate.quantityIsNot0OrLess,
  async (req, res) => {
    const { id } = req.params;
    const document = {
      itensSold: req.body,
    };
    await crud.update('sales', id, document);
    crud.read('id', id, 'sales').then((sale) => res.status(200).json(sale));
  },
);

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const sale = await crud.read('id', id, 'sales');
  if (!sale) {
    return res.status(422).json({ err: { code: 'invalid_data', message: 'Wrong sale ID format' } });
  }
  await quantityService.updateProductQuantity(req.method, sale.itensSold);
  await crud.delete('sales', id);
  res.status(200).json(req.sale);
});

module.exports = router;
