const express = require('express');
const { HTTPStatus } = require('../config/index');
const errors = require('../services/errors');
const validations = require('../middlewares/salesValidation');
const salesModel = require('../models/salesModel');

const router = express.Router();

router.get('/',
  async (_req, res) => {
    try {
      const sales = await salesModel.getAllSales();
      return res.status(HTTPStatus.OK).json({ sales });
    } catch (_err) {
      return errors.serverInternalError(res);
    }
  });

router.get('/:id',
  async (req, res) => {
    try {
      const sales = await salesModel.getSaleById(req.params.id);

      if (sales === null) {
        return errors.clientUnprocessableEntityError(res, 'Wrong id format');
      }

      return res.status(HTTPStatus.OK).json(sales);
    } catch (_err) {
      return errors.serverInternalError(res);
    }
  });

router.post('/',
  validations.validateProductIdExists,
  validations.validateSaleQuantity,
  async (req, res) => {
    try {
      const [...itensSold] = req.body;
      console.log(itensSold);
      if (itensSold) {
        const sale = await salesModel.addSale(itensSold);

        return res.status(HTTPStatus.OK).json(sale);
      }
    } catch (_e) {
      return errors.serverInternalError(res);
    }
  });

router.put('/:id',
  validations.validateProductIdExists,
  validations.validateSaleQuantity,
  async (req, res) => {
    try {
      const sale = req.body;
      const { id } = req.params;

      await salesModel.updateSale(id, sale);
      const updateSale = await salesModel.getSaleById(id);

      return res.status(HTTPStatus.OK).json(updateSale);
    } catch (_e) {
      return res.erros.serverInternalError(res);
    }
  });

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteSales = await salesModel.getSaleById(id);

    if (!deleteSales) {
      return errors.clientUnprocessableEntityError(res, 'Wrong sale ID format', 'invalid_data');
    }

    await salesModel.removeSale(id);
    return res.status(HTTPStatus.OK).json(deleteSales);
  } catch (_e) {
    return errors.RequestNotFoundError(res);
  }
});

module.exports = router;
