const express = require('express');
const salesModel = require('../models/salesModel');
const salesValidations = require('../middlewares/salesValidations');

const router = express.Router();

// router.get('/', async (_, res) => res.status(200).send('oi'));

// router.get('/:id', async (_, res) => res.status(200).send('oi'));

router.post('/', salesValidations.isQuantityValid, async (req, res) => {
  const [...products] = req.body;
  const add = await salesModel.add(...products);
  res.status(200).json(add);
});

// router.put('/:id', async (_, res) => res.status(200).send('oi'));

// router.delete('/:id', async (_, res) => res.status(200).send('oi'));

module.exports = router;
