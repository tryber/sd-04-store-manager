const express = require('express');

const router = express.Router();

const saleModel = require('../models/saleModel');

const saleValidator = require('../middlewares/saleValidator');

// BUSCAR TODAS AS VENDAS

router.get('/', async (_req, res) => {
  try {
    const sales = await saleModel.getAllSales();

    console.log('linha 15, sales: ', sales);

    if (!sales) {
      return res
        .status(422)
        .json(saleValidator.responseMessage('invalid_data', 'Wrong sale ID format'));
    }

    res.status(200).json({ sales });
  } catch (_err) {
    return res
      .status(422)
      .json(saleValidator.responseMessage('invalid_data', 'Wrong sale ID format'));
  }
});

// BUSCAR UMA VENDA POR ID

router.get('/:id', async (req, res) => {
  try {
    // const { id } = req.params;

    const sale = await saleModel.getSaleById(req.params.id);

    if (!sale) {
      return res
        .status(422)
        .json(saleValidator.responseMessage('invalid_data', 'Wrong sale ID format'));
    }

    return res.status(200).json(sale);
  } catch (_err) {
    return res
      .status(422)
      .json(saleValidator.responseMessage('invalid_data', 'Wrong sale ID format'));
  }
});

// CRIAR UMA VENDA

router.post(
  '/',
  saleValidator.validateSaleQuantity,
  saleValidator.validateQuantityIsNumber,
  async (req, res) => {
    try {
      const [...itensSold] = req.body;

      const sale = await saleModel.addSale(itensSold);

      return res.status(200).json(sale);
    } catch (_err) {
      return res
        .status(422)
        .json(saleValidator.responseMessage('invalid_data', 'Wrong sale ID format'));
    }
  },
);

// DELETAR UMA VENDA

router.delete('/:id', async (req, res) => {
  try {
    const sale = await saleModel.getSaleById(req.params.id);

    if (!sale) {
      return res
        .status(422)
        .json(saleValidator.responseMessage('invalid_data', 'Wrong sale ID format'));
    }

    await saleModel.removeSale(req.params.id);

    return res.status(200).json(sale);
  } catch (_err) {
    return res
      .status(422)
      .json(saleValidator.responseMessage('invalid_data', 'Wrong sale ID format'));
  }
});

// ATUALIZAR UMA VENDA

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const sale = await saleModel.getSaleById(id);

    if (!sale) {
      return res
        .status(422)
        .json(
          saleValidator.responseMessage('invalid_data', 'Wrong product ID or invalid quantity'),
        );
    }

    await saleModel.updateSale(id, sale);
  } catch (_err) {
    return res
      .status(422)
      .json(saleValidator.responseMessage('invalid_data', 'Wrong product ID or invalid quantity'));
  }
});

module.exports = router;
