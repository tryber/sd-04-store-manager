const express = require('express');
const productsModel = require('../models/productsModel');
const { HTTPStatus } = require('../config/index');
const errors = require('../services/errors');
const validations = require('../middlewares/productsValidation');

const router = express.Router();

router.get('/',
  async (_req, res) => {
    try {
      const products = await productsModel.getAll();
      return res.status(HTTPStatus.OK).json(products);
    } catch (_err) {
      return errors.serverInternalError(res);
    }
  });

router.get('/:id',
  async (req, res, next) => {
    try {
      const products = await productsModel.getById(req.params.id);

      if (products === null) {
        return next(errors.clientUnprocessableEntityError(res, 'Wrong id format'));
      }

      return res.status(HTTPStatus.OK).json(products);
    } catch (_err) {
      return errors.serverInternalError(res);
    }
  });

router.post('/',
  validations.validateNameLength,
  validations.validateQuantity,
  validations.validateProductExists,
  async (req, res) => {
    try {
      const { name, quantity } = req.body;

      const product = await productsModel.add(name, quantity);

      return res.status(HTTPStatus.CREATED).json(product);
    } catch (_e) {
      return errors.serverInternalError(res);
    }
  });

module.exports = router;
