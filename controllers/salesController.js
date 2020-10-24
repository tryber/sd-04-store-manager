const router = require('express').Router();
const rescue = require('express-rescue');
const { sales: { validateSale }, addNew, getAll } = require('../models');

router.post('/', rescue(async ({ body }, res) => {
  validateSale(body);
  const newSale = await addNew('sales', { itensSold: body });
  res.json(newSale);
}));

router.get('/', rescue(async (_req, res) => {
  const sales = await getAll('sales');
  res.json({ sales });
}));

module.exports = router;
