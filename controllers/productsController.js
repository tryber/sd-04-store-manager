const express = require('express');
const productsModel = require('../models/productsModel');
const { HTTPStatus } = require('../config/index');
const errors = require('../services/errors');
const validations = require('../middlewares/productsValidation');
const { validateUpdate } = require('../middlewares/productsValidation');

const router = express.Router();

router.get('/',
  async (_req, res) => {
    try {
      const products = await productsModel.getAll();
      return res.status(HTTPStatus.OK).json({ products });
    } catch (_err) {
      return errors.serverInternalError(res);
    }
  });

router.get('/:id',
  async (req, res) => {
    try {
      const products = await productsModel.getById(req.params.id);

      if (products === null) {
        return errors.clientUnprocessableEntityError(res, 'Wrong id format');
      }

      return res.status(HTTPStatus.OK).json(products);
    } catch (_err) {
      return errors.serverInternalError(res);
    }
  });

router.post('/',
  validations.validateProductExists,
  validations.validateNameLength,
  validations.validateQuantity,
  async (req, res) => {
    try {
      const { name, quantity } = req.body;

      const product = await productsModel.add(name, quantity);

      return res.status(HTTPStatus.CREATED).json(product);
    } catch (_e) {
      return errors.serverInternalError(res);
    }
  });

router.put('/:id',
  validations.validateNameLength,
  validations.validateQuantity,
  validations.validateCanBeUpdated,
  async (req, res) => {
    try {
      const { name, quantity } = req.body;
      const { id } = req.params;

      await productsModel.update(id, name, quantity);
      const updateProduct = await productsModel.getById(id);

      return res.status(HTTPStatus.OK).json(updateProduct);
    } catch (_e) {
      return res.erros.serverInternalError(res);
    }
  });

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const removedProduct = await productsModel.getById(id);

    if (!removedProduct) {
      return errors.clientUnprocessableEntityError(res, 'Wrong id format');
    }

    await productsModel.remove(id);

    res.status(HTTPStatus.OK).json();
  } catch (_e) {
    return res.erros.serverInternalError(res);
  }
});

module.exports = router;
