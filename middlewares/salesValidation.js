// const salesModel = require('../models/salesModel');

const buildResponse = (code, message) => {
  const resp = { err: { code, message } };
  return resp;
};

// não é possível cadastrar vendas com quantidade menor ou igual a zero
const validateQuantity = async (req, res, next) => {
  const [...itensSold] = req.body;
  const quantities = itensSold.map(({ quantity }) => quantity);

  if (quantities.some((item) => item <= 0)) {
    return res
      .status(422)
      .json(buildResponse('invalid_data', 'Wrong product ID or invalid quantity'));
  }

  next();
};

// não é possível cadastrar vendas com uma string no campo quantidade
const validateQuantityIsNumber = async (req, res, next) => {
  const [...itensSold] = req.body;
  const quantities = itensSold.map(({ quantity }) => quantity);

  if (quantities.some((item) => isNaN(item))) {
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
