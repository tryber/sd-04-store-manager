const salesModel = require('../models/salesModel');

const buildResponse = (code, message) => ({ err: { code, message } });

// quantity
const validateQuantityIsMoreThanZero = (req, res, next) => {
  req.body.forEach((element) => {
    if (element.quantity <= 0) {
      return res
        .status(422)
        .json(buildResponse('invalid_data', 'Wrong product ID or invalid quantity'));
    }

    if (element.quantity <= 0) {
      return res
        .status(422)
        .json(buildResponse('invalid_data', 'Wrong product ID or invalid quantity'));
    }
  });

  next();
};

const validateQuantityIsNumber = (req, res, next) => {
  req.body.forEach((element) => {
    // console.log('element: ', element);
    // console.log('element.quantity: ', element.quantity);
    if (!Number.isInteger(element.quantity)) {
      return res
        .status(422)
        .json(buildResponse('invalid_data', 'Wrong product ID or invalid quantity'));
    }
  });
  // console.log('MSG: ', msg);

  next();
};

// Id - valida se o produto exite por Id
const validateSaleExistsById = async (req, res, next) => {
  const { id } = req.params;
  const sale = await salesModel.findById(id);

  if (sale === false) {
    return res.status(422).json(buildResponse('invalid_data', 'Wrong sale ID format'));
  }

  if (!sale) {
    return res.status(404).json(buildResponse('not_found', 'Sale not found'));
  }

  req.sale = sale;
  next();
};

const notFound = buildResponse('not_found', 'Sale not found');

module.exports = {
  validateQuantityIsMoreThanZero,
  validateQuantityIsNumber,
  validateSaleExistsById,
  notFound,
};
