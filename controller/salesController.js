const express = require('express');
const SalesModel = require('../model/salesModel');
const validate = require('../middlewares/validate');

const router = express.Router();

// Cadastrar uma venda
router.post('/', validate.validateSale, async (req, res) => {
  const sale = await SalesModel.add(req.body);
  res.status(200).json(sale);
});

// Listar todas as vendas
router.get('/', async (_req, res) => {
  const sales = await SalesModel.getAll();
  return res.status(200).json({ sales });
});

// Listar Sale especifica por ID
router.get('/:id', async (req, res) => {
  const sale = await SalesModel.getById(req.params.id);

  if (!sale) {
    return res.status(422).json(validate.buildErrors('not_found', 'Sale not found'));
  }

  return res.status(200).json(sale);
});

// Atualizar uma Venda
router.put('/:id', validate.validateSale, async (req, res) => {
  const { id } = req.params;
  const oldSale = await SalesModel.getById(id);

  if (!oldSale) {
    return res.status(422).json(validate.buildErrors('invalid_data', 'Wrong id format'));
  }

  await SalesModel.update(id, req.body);
  const sale = await SalesModel.getById(id);
  return res.status(200).json(sale);
});

// Deletar uma Venda
router.delete('/:id', async (req, res) => {
  const removedSale = await SalesModel.getById(req.params.id);

  if (!removedSale) {
    return res.status(422).json(validate.buildErrors('invalid_data', 'Wrong sale ID format'));
  }

  await SalesModel.remove(id);
  return res.status(200).json(removedSale);
});

module.exports = router;
