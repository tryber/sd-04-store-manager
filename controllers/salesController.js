const express = require('express');
const salesValidations = require('../middlewares/salesValidations');
const salesModel = require('../models/salesModel');

const router = express.Router();

router.post(
  '/',
  salesValidations.validateQuantityIsNumber,
  salesValidations.validateQuantityIsMoreThanZero,
  async (req, res) => {
    try {
      console.log(req.body);
      console.log(' ');
      const sale = await salesModel.add(req.body);
      res.status(200).json(sale);
    } catch (_error) {
      console.log(_error.message);
      res.status(501).json({ message: 'Falha ao cadastrar venda' });
    }
  },
);

module.exports = router;
