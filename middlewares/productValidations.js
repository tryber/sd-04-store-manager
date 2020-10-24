const productsModel = require('../models/productsModel');
const returnResponse = require('../services/returnResponse');

const validateNameLength = (req, res, next) => {
  const { name } = req.body;

  if (name.length < 5) {
    return res
      .status(422)
      .json(returnResponse('invalid_data', '"name" length must be at least 5 characters long'));
  }

  next();
};

const validateQuantity = (req, res, next) => {
  const { quantity } = req.body;

  if (quantity <= 0) {
    return res
      .status(422)
      .json(returnResponse('invalid_data', '"quantity" must be larger than or equal to 1'));
  }

  if (!Number.isInteger(quantity)) {
    return res.status(422).json(returnResponse('invalid_data', '"quantity" must be a number'));
  }

  next();
};

const validateProductExistence = async (req, res, next) => {
  const { name } = req.body;
  const product = await productsModel.getProductByName(name);

  if (product) {
    return res.status(422).json(returnResponse('invalid_data', 'Product already exists'));
  }

  next();
};

module.exports = {
  validateNameLength,
  validateQuantity,
  validateProductExistence,
};
