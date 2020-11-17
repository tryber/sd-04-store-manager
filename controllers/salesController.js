const express = require('express');

const router = express.Router();
const validation = require('../middlewares/validations');
const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');
const { buildError } = require('../middlewares/validations');

// Mostrar todas as vendas
router.get('/', async (req, res) => {
  const sales = await salesModel.getAllSales();
  return res.status(200).json({ sales });
});

// Cadastrar vendas
router.post('/',
  validation.saleValidation,
  async (req, res) => {
    const [{ productId, quantity }] = req.body;
    const stockQuantity = await productsModel.findById(productId);
    console.log(req.body, stockQuantity);

    if (quantity === stockQuantity.quantity) await productsModel.deleteProduct(productId);
    if (stockQuantity.quantity >= quantity) {
      const newSale = await salesModel.registerSale(req.body);
      return res.status(200).json(newSale);
    }
    return res.status(404).json(buildError('stock_problem', 'Such amount is not permitted to sell'));
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
