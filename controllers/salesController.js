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
    const listSales = await salesModel.listSales();
    res.status(200).json({ sales: listSales });
  } catch (_e) {
    console.log(_e);
    res.status(404).json({ message: 'Falha ao listar' });
  }
});

router.put('/:id', salesValidations.saleQuantityValidation, async (req, res) => {
  try {
    const { quantity, productId } = req.body[0];
    console.log(quantity, productId, 'passou no put');

    await salesModel.updateSale(req.params.id, productId, quantity);
    const saleChanged = await salesModel.findSaleById(req.params.id);
    console.log(saleChanged);
    res.status(200).json(saleChanged);
  } catch (_e) {
    console.log(_e);
    res.status(422).json({ message: 'Falha ao encontrar' });
  }
});

module.exports = router;
