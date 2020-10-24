const router = require('express').Router();
const Boom = require('@hapi/boom');
const rescue = require('express-rescue');
const { addNew, getAll, getById, update } = require('../models');
const validateSale = require('../middlewares/validadeSale');

router.post('/', validateSale, rescue(async ({ body }, res) => {
  const newSale = await addNew('sales', { itensSold: body });
  res.json(newSale);
}));

router.get('/', rescue(async (_req, res) => {
  const sales = await getAll('sales');
  res.json({ sales });
}));

router.put('/:id', validateSale, rescue(async ({ body, params: { id } }, res) => {
  await update('sales', id, { itensSold: body });
  res.json({ _id: id, itensSold: body });
}));

router.get('/:id', rescue(async ({ params: { id } }, res) => {
  const sale = await getById('sales', id);
  if (!sale) throw Boom.notFound('Sale not found', { code: 'not_found' });
  res.json(sale);
}));

module.exports = router;
