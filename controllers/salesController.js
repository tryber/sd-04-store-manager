const router = require('express').Router();
const Boom = require('@hapi/boom');
const rescue = require('express-rescue');
const { getAll, getById, update } = require('../models');
const { postSale, removeSale } = require('../services/updateQuantity');
const validateSale = require('../middlewares/validadeSale');

router.post('/', validateSale, rescue(async ({ body }, res) => {
  const newSale = await postSale(body);
  res.json(newSale);
}));

router.get('/', rescue(async (_req, { json }) => {
  const sales = await getAll('sales');
  json({ sales });
}));

router.put('/:id', validateSale, rescue(async ({ body, params: { id } }, res) => {
  await update('sales', id, { itensSold: body });
  res.json({ _id: id, itensSold: body });
}));

router.delete('/:id', rescue(async ({ params: { id } }, res) => {
  const result = await removeSale(id);
  res.json(result);
}));

router.get('/:id', rescue(async ({ params: { id } }, res) => {
  const sale = await getById('sales', id);
  if (!sale) throw Boom.notFound('Sale not found', { code: 'not_found' });
  res.json(sale);
}));

module.exports = router;
