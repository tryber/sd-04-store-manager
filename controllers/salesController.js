const express = require('express');
const rescue = require('express-rescue');
const salesService = require('../services/salesService');

class SalesErr extends Error {
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
    throw new SalesErr(result);
  }

  res.status(200).json(result);
}));

router.put('/:id', rescue(async (req, res) => {
  const items = req.body;
  const { id } = req.params;
  const updatedResult = await salesService.update(id, items);
  if (typeof updatedResult === 'string') {
    throw new SalesErr(updatedResult);
  }

  res.status(200).json(updatedResult);
}));

router.use(rescue.from(SalesErr, (error, _req, res, _next) => {
  res.status(422)
    .json({ err: { code: 'invalid_data', message: error.message } });
}));

router.use((err, req, res) => {
  res.status(500)
    .json({ err: 'Something went terribly wrong' });
});

module.exports = router;
