const express = require('express');
const validations = require('../middlewares/inputValidations');
const crudModel = require('../models/crudModel');

const router = express.Router();

router.post('/', validations.validateSales, async (req, res) => {
  const document = {
    itensSold: req.body,
  };
  const insertedSales = await crudModel.createOne('sales', document);
  res.status(200).json(insertedSales);
});

router.get('/', async (_req, res) => {
  crudModel.findAll('sales').then((sales) => res.status(200).json({ sales }));
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const sale = await crudModel.findById('sales', id);
  res.status(200).json(sale);
});

module.exports = router;
