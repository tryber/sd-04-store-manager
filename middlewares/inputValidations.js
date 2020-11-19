const crudModel = require('../models/crudModel');

const buildResponse = (code, message) => ({ err: { code, message } });
const validateName = (req, res, next) => {
  const { name } = req.body;
  if (name.length < 5) {
    return res
      .status(422)
      .json(buildResponse('invalid_data', '"name" length must be at least 5 characters long'));
  }
  next();
};

const verifyProducts = async (req, res, next) => {
  const { name } = req.body;
  const product = await crudModel.findByName('products', name);
  if (product) {
    return res.status(422).json(buildResponse('invalid_data', 'Product already exists'));
  }
  next();
};

const validateQuantity = (req, res, next) => {
  const { quantity } = req.body;
  if (quantity < 1) {
    return res
      .status(422)
      .json(buildResponse('invalid_data', '"quantity" must be larger than or equal to 1'));
  }

  if (!Number.isInteger(quantity)) {
    return res.status(422).json(buildResponse('invalid_data', '"quantity" must be a number'));
  }
  next();
};

module.exports = {
  validateName,
  verifyProducts,
  validateQuantity,
};
