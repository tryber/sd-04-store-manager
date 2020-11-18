const salesModel = require('../models/salesModel');
const { buildResponse } = require('./buildResponse');

const saleQuantityValidation = async (req, res, next) => {
  const [...itensSold] = req.body;
  let isError = false;

  itensSold.forEach((item) => {
    if (item.quantity <= 0 || isNaN(item.quantity)) {
      isError = true;
    }
  });

  if (isError) {
    return res.status(422).json(buildResponse('invalid_data', 'Wrong product ID or invalid quantity'));
  }

  next();
};

const idExistsValidation = async (req, res, next) => {
  const { id } = req.params;
  const sale = await salesModel.findSaleById(id);

  if (!sale) {
    return res.status(404).json(buildResponse('not_found', 'Sale not found'));
  }

  req.sale = sale;

  next();
};

module.exports = {
  saleQuantityValidation,
  idExistsValidation,
};
