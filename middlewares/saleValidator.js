// const saleModel = require('../models/saleModel');

const responseMessage = (code, message) => ({ err: { message, code } });

const validateSaleQuantity = async (req, res, next) => {
  const [...itensSold] = req.body;

  console.log('linha 9, validator, itensSold: \n', itensSold);

  itensSold.forEach((item) => {
    if (item.quantity < 0 || item.quantity === 0) {
      return res
        .status(422)
        .json(responseMessage('invalid_data', 'Wrong product ID or invalid quantity'));
    }
  });

  next();
};

const validateQuantityIsNumber = async (req, res, next) => {
  const [...itensSold] = req.body;

  console.log(itensSold);

  itensSold.forEach((item) => {
    console.log('linha 31', item);
    if (!Number.isInteger(item.quantity)) {
      return res
        .status(422)
        .json(responseMessage('invalid_data', 'Wrong product ID or invalid quantity'));
    }
  });

  next();
};

module.exports = {
  responseMessage,
  validateSaleQuantity,
  validateQuantityIsNumber,
};
