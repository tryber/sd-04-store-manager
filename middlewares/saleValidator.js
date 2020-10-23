const saleModel = require('../models/saleModel');

const responseMessage = (code, message) => ({ err: { message, code } });

const validateSaleQuantity = async (req, res, next) => {
  const data = req.body.itensSold;

  const itensSold = await data.map((item) => item);

  console.log('linha 9, data: \n', itensSold);

  if (itensSold.quantity < 0 || itensSold.quantity === 0) {
    return res.status(422).json(responseMessage('invalid_data', '"quantity" must be a number'));
  }
  next();
};

const validateQuantityIsNumber = async (req, res, next) => {
  const data = req.body;

  data.forEach((item) => {
    if (!Number.isInteger(item.quantity)) {
      return res.status(422).json(responseMessage('invalid_data', '"quantity" must be a number'));
    }
  });

  next();
};

module.exports = {
  responseMessage,
  validateSaleQuantity,
  validateQuantityIsNumber,
};
