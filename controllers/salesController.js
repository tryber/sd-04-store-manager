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

module.exports = router;
