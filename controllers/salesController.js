const express = require('express');
const validationSalles = require('../middlewares/validationSales');
const salesModel = require('../model/salesModel');

const router = express.Router();
const buildResult = (_id, itensSold) => ({
  _id,
  itensSold,
});

router.post('/', validationSalles.quantityProduct, async (req, res) => {
  try {
    const productSale = await salesModel.addSale(req.body);
    const { _id, itensSold } = productSale.ops[0];
    res.status(200).json(buildResult(_id, itensSold));
  } catch (_e) {
    console.log(_e);
    res.status(501).json({ message: 'registration failed.' });
  }
});

module.exports = router;
