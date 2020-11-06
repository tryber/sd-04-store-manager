const express = require('express');
const salesValidations = require('../middlewares/salesValidation');
const salesModel = require('../models/salesModel');

const router = express.Router();

// Add new sale
router.post(
  '/',
  salesValidations.validateQuantity,
  salesValidations.validateQuantityIsNumber,
  async (req, res) => {
    const [...itensSold] = req.body;
    const sales = await salesModel.addSale(itensSold);
    res.status(200).json(sales);
  },
);

// show all sales
router.get('/', async (req, res) => {
  const sales = await salesModel.findAll();

  res.status(200).json({ sales });
});

// show sale
router.get('/:id', salesValidations.validateIdExistence, async (req, res) =>
  res.status(200).json(req.sale),
);

// update sale
router.put(
  '/:id',
  salesValidations.validateQuantity,
  salesValidations.validateQuantityIsNumber,
  async (req, res) => {
    const { id } = req.params;
    const itensSold = req.body;
    const result = await salesModel.updateSale(id, itensSold);

    res.status(200).json(result);
  },
);

// delete sale
router.delete('/:id', salesValidations.validateIdExistence, async (req, res) => {
  const { id } = req.params;
  await salesModel.deleteSale(id);

  res.status(200).json(req.sale);
});

module.exports = router;
