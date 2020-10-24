const express = require('express');
const salesModel = require('../models/salesModel');
const salesVerify = require('../middlewares/salesVerify');
const index = require('../models/index');

const { quantityVerify } = salesVerify;

const router = express.Router();

router.post('/', quantityVerify, async (req, res) => {
  try {
    const [...itensSold] = req.body;
    const addSales = await salesModel.addSales(itensSold);
    res.status(200).json(addSales);
  } catch (_e) {
    console.log(_e.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const listSales = await salesModel.getAll();
    res.status(200).json({ sales: listSales });
  } catch (_e) {
    console.log(_e.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await index.getById(id, 'sales');
    const errMessage = { err: { code: 'not_found', message: 'Sale not found' } };
    if (!sale) return res.status(404).json(errMessage);
    res.status(200).json(sale);
  } catch (_e) {
    console.log(_e.message);
  }
});

router.put('/:id', quantityVerify, async (req, res) => {
  try {
    const { id } = req.params;
    const [...sale] = req.body;

    await salesModel.updateSale(id, sale);
    const updatedSale = await index.getById(id, 'sales');
    res.status(200).json(updatedSale);
  } catch (_e) {
    console.log(_e.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const itemToDelete = await index.getById(id, 'sales');
    const errMessage = { err: { code: 'invalid_data', message: 'Wrong sale ID format' } };
    if (!itemToDelete) return res.status(422).json(errMessage);
    await index.deleteProduct(id, 'sales');
    return res.status(200).itemToDelete;
  } catch (_e) {
    console.log(_e.message);
  }
});

module.exports = router;
