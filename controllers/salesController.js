const express = require('express');
const salesValidations = require('../middlewares/salesValidations');
const salesModel = require('../model/salesModel');

const router = express.Router();
const buildResult = (_id, itensSold) => ({
  _id,
  itensSold,
});

router.post('/', salesValidations.saleQuantityValidation, async (req, res) => {
  try {
    const sale = await salesModel.addSale(req.body);
    const { _id, itensSold } = sale.ops[0];
    res.status(200).json(buildResult(_id, itensSold));
  } catch (_e) {
    res.status(501).json({ message: 'Falha ao cadastrar a Venda' });
  }
});

router.get('/', salesValidations.returnAllSales, async (req, res) => {
  try {
    console.log('try returnAllSales');
    const listSales = await salesModel.listSales();
    console.log(listSales);
    res.status(200).json({ sales: listSales });
  } catch (_e) {
    console.log(_e);
    res.status(404).json({ message: 'Falha ao listar' });
  }
});

module.exports = router;
