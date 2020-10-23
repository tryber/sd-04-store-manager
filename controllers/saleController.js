const express = require('express');

const router = express.Router();

const saleModel = require('../models/saleModel');

const saleValidator = require('../middlewares/saleValidator');

// buscar todas as vendas

router.get('/', async (_req, res) => {
  try {
    const sales = await saleModel.getAllSales();
    if (!sales) {
      return res.status(422).json(saleValidator.responseMessage('invalid_data', 'Wrong id format'));
    }

    res.status(200).json({ sales });
  } catch (_err) {
    return res.status(422).json(saleValidator.responseMessage('invalid_data', 'Wrong id format'));
  }
});

// buscar uma venda por id

router.get('/:id', async (req, res) => {
  try {
    // const { id } = req.params;

    const sale = await saleModel.getSaleById(req.params.id);

    if (!sale) {
      return res.status(422).json(saleValidator.responseMessage('invalid_data', 'Wrong id format'));
    }

    return res.status(200).json(sale);
  } catch (_err) {
    return res.status(422).json(saleValidator.responseMessage('invalid_data', 'Wrong id format'));
  }
});

// criar uma venda

router.post(
  '/',
  // saleValidator.validateSaleQuantity,
  // saleValidator.validateQuantityIsNumber,
  async (req, res) => {
    try {
      const [itensSold] = req.body;
      console.log('linha 51 itensSold', itensSold);

      const sale = await saleModel.addSale(itensSold);

      return res.status(201).json(sale);
    } catch (_err) {
      return res.status(422).json(saleValidator.responseMessage('invalid_data', 'Wrong id format'));
    }
  },
);

// deletar uma venda

router.delete('/:id', async (req, res) => {
  try {
    const sale = await saleModel.getSaleById(req.params.id);

    if (!sale) {
      return res.status(422).json(saleValidator.responseMessage('invalid_data', 'Wrong id format'));
    }

    await saleModel.removeSale(id);

    return res.status(200).json(sale);
  } catch (_err) {
    return res.status(422).json(saleValidator.responseMessage('invalid_data', 'Wrong id format'));
  }
});

// atualizar uma venda

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const sale = await saleModel.getSaleById(id);

    if (!sale) {
      return res.status(422).json(saleValidator.responseMessage('invalid_data', 'Wrong id format'));
    }

    await saleModel.updateSale(id, sale);
  } catch (_err) {
    return res.status(422).json(saleValidator.responseMessage('invalid_data', 'Wrong id format'));
  }
});

module.exports = router;
