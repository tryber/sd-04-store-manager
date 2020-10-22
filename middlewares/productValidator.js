const productModel = require('../models/productModel');

const responseMessage = (code, message) => ({ error: { message, code } });

const validateProductName = (req, res, next) => {
  const { name } = req.body;

  if (name.length < 5) {
    return res
      .status(422)
      .json(responseMessage('invalid_data', 'Name length must be at least 5 characters long'));
  }
  next();
};

const isProductNameUnique = async (req, res, next) => {
  const { name } = req.body;
  const product = await productModel.getProductByName(name);
  if (product) {
    return res.status(422).json(responseMessage('already_exists', 'Product already exists'));
  }
  next();
};

const validateProductQuantity = (req, res, next) => {
  const { quantity } = req.body;
  if (quantity < 0 || quantity === 0) {
    return res
      .status(422)
      .json(responseMessage('invalid_data', 'Quantity must be larger than or equal to 1'));
  }
  next();
};

const validateProductQuantityisNumber = (req, res, next) => {
  const { quantity } = req.body;
  if (!Number.isInteger(quantity)) {
    return res.status(422).json(responseMessage('invalid_data', 'Quantity must be a number'));
  }
  next();
};

module.exports = {
  validateProductName,
  isProductNameUnique,
  validateProductQuantity,
  validateProductQuantityisNumber,
};
