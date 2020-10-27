const express = require('express');
const rescue = require('express-rescue');
const salesService = require('../services/salesService');

class SalesError extends Error {
  constructor(message = '') {
    super(message);
  }
}

const router = express.Router();

router.get('/', async (req, res) => {
  const salesArray = await salesService.getAllSales();
  res.status(200).json({ sales: salesArray });
});

router.post('/', rescue(async (req, res) => {
  const items = req.body;
  const result = await salesService.add(items);
  if (typeof result === 'string') {
    throw new SalesError(result);
  }

  res.status(200).json(result);
}));

router.use(rescue.from(SalesError, (err, req, res) => {
  res.status(422)
    .json({ err: { code: 'invalid_data', message: err.message } });
}));

router.use((err, req, res) => {
  res.status(500)
    .json({ err: 'Something went terribly wrong' });
});

module.exports = router;
