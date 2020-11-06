// const salesModel = require('../models/salesModel');

const buildResponse = (code, message) => {
  const resp = { err: { code, message } };
  return resp;
};

// não é possível cadastrar vendas com quantidade menor ou igual a zero
const validateQuantity = (req, res, next) => {
  const list = req.body;
  let isValid = true;
  list.map(({ quantity }) => {
    if (quantity <= 0) {
      isValid = false;
    }
    return null;
  });
  if (!isValid) {
    return res
      .status(422)
      .json(buildResponse('invalid_data', 'Wrong product ID or invalid quantity'));
  }

  next();
};

// não é possível cadastrar vendas com uma string no campo quantidade
const validateQuantityIsNumber = (req, res, next) => {
  const list = req.body;
  let isValid = true;
  list.map(({ quantity }) => {
    if (isNaN(quantity)) {
      isValid = false;
    }
    return null;
  });
  if (!isValid) {
    return res
      .status(422)
      .json(buildResponse('invalid_data', 'Wrong product ID or invalid quantity'));
  }

  next();
};

module.exports = {
  validateQuantity,
  validateQuantityIsNumber,
};
