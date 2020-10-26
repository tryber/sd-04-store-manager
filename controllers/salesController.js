const express = require('express');
const rescue = require('express-rescue');
const salesModel = require('../models/salesModel');

class SalesNotFound extends Error {
  constructor(message = '') {
    super(message);
  }
}

const router = express.Router();

router.get('/', rescue(async (req, res) => {
  const salesArray = await salesModel.getAll();
  if (salesArray.length === 0) {
    throw new SalesNotFound('No sales have been found');
  }
  const sales = { sales: salesArray };
  res.status(200).json(sales);
}));

router.use(rescue.from(SalesNotFound, (err, req, res) => {
  res.status(404)
    .json({ error: err.message });
}));

router.use((err, req, res) => {
  res.status(500)
    .json({ error: 'Something went terribly wrong' });
});

module.exports = router;
