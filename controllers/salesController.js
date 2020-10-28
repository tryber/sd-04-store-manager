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

module.exports = router;
