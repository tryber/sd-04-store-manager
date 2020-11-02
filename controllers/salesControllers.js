const express = require('express');

const salesService = require('../services/salesService');

const router = express.Router();

router.post('/', async (req, res) => {
  const itensSold = req.body;

  const result = await salesService.adicionar(itensSold);

  if (result.code === 'invalid_data') return res.status(422).json({ err: result });
  res.status(200).json(result);
});

module.exports = router;
