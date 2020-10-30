const express = require('express');
const salesValidations = require('../middlewares/salesValidations');
const salesModel = require('../models/salesModel');

const router = express.Router();

// Req. 6 - Lista todas as vendas
router.get('/', async (req, res) => {
  try {
    const sales = await salesModel.getAll();
    res.status(200).json({ sales });
  } catch (_error) {
    console.log(_error.message);
    res.status(501).json({ message: 'Falha ao listar vendas' });
  }
});

// Req. 5 - Casdastra vendas
router.post(
  '/',
  salesValidations.validateQuantityIsNumber,
  salesValidations.validateQuantityIsMoreThanZero,
  async (req, res) => {
    try {
      // console.log(req.body);
      // console.log(' ');
      const sale = await salesModel.add(req.body);
      res.status(200).json(sale);
    } catch (_error) {
      console.log(_error.message);
      res.status(501).json({ message: 'Falha ao cadastrar venda' });
    }
  },
);

// Req. 6 - Lista uma venda
router.get('/:id', salesValidations.validateSaleExistsById, async (req, res) => {
  try {
    const { id } = req.params;
    const sales = await salesModel.findById(id);
    res.status(200).json({ sales });
  } catch (_error) {
    console.log(_error.message);
    res.status(501).json({ message: 'Falha ao listar vendas' });
  }
});

module.exports = router;
