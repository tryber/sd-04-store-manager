const errors = require('../services/errors');
const productsModel = require('../models/productsModel');

const validateNameLength = (req, res, next) => {
  const { name } = req.body;

  if (name.length < 5) {
    return errors.clientUnprocessableEntityError(res, '"name" length must be at least 5 characters long');
  }
  next();
};

const validateQuantity = (req, res, next) => {
  const { quantity } = req.body;

  if (!Number.isInteger(quantity)) {
    return errors.clientUnprocessableEntityError(res, '"quantity" must be a number');
  }

  if (quantity <= 0) {
    return errors
      .clientUnprocessableEntityError(res, '"quantity" must be larger than or equal to 1');
  }

  next();
};

const validateProductExists = async (req, res, next) => {
  const { name } = req.body;
  const isProductExists = await productsModel.getByName(name);

  if (isProductExists) {
    return errors.clientUnprocessableEntityError(res, 'Product already exists');
  }

  next();
};

module.exports = {
  validateNameLength,
  validateQuantity,
  validateProductExists,
};
