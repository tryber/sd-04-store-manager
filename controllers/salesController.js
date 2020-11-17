const express = require('express');

const router = express.Router();
const validation = require('../middlewares/validations');
const salesModel = require('../models/salesModel');

// Mostrar todas as vendas
router.get('/', async (req, res) => {
  const sales = await salesModel.getAllSales();
  return res.status(200).json({ sales });
});

// Cadastrar vendas
router.post('/',
  validation.saleValidation,
  async (req, res) => {
    const newSale = await salesModel.registerSale(req.body);
    return res.status(200).json(newSale);
  });

// Listar venda por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const sale = await salesModel.findById(id);

  if (!sale) {
    return res.status(404).json(validation.buildError('not_found', 'Sale not found'));
  }
  return res.status(200).json(sale);
});

// Atualizar vendas
router.put('/:id',
  validation.saleValidation,
  async (req, res) => {
    const { id } = req.params;
    const previousSale = await salesModel.findById(id);

    if (!previousSale) {
      return res.status(422).json(validation.buildError('invalid_data', 'Wrong id format'));
    }
    await salesModel.updateSale(id, req.body);
    const sale = await await salesModel.findById(id);
    return res.status(200).json(sale);
  });

// Deletar vendas
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deletedSale = await salesModel.findById(id);

  if (!deletedSale) {
    return res.status(422).json(validation.buildError('invalid_data', 'Wrong sale ID format'));
  }

  await salesModel.deleteSale(id);
  return res.status(200).json(deletedSale);
});

module.exports = router;
