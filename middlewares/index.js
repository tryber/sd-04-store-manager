const crud = require('../models/crud');
const errorResponse = require('./errorResponse');

const validateNameLength = (req, res, next) => {
  const { name } = req.body;

  if (name.length < 5) {
    return res
      .status(422)
      .json(errorResponse('invalid_data', '"name" length must be at least 5 characters long'));
  }

  return next();
};

const verifyIfProductExistsByName = async (req, res, next) => {
  const { name } = req.body;

  const product = await crud.readByName('products', name);

  if (product) {
    return res.status(422).json(errorResponse('invalid_data', 'Product already exists'));
  }

  return next();
};

const validateQuantity = (req, res, next) => {
  const { quantity } = req.body;

  if (quantity < 1) {
    return res
      .status(422)
      .json(errorResponse('invalid_data', '"quantity" must be larger than or equal to 1'));
  }

  if (!Number.isInteger(quantity)) {
    return res.status(422).json(errorResponse('invalid_data', '"quantity" must be a number'));
  }

  return next();
};

const verifyIfProductExistsById = async (req, res, next) => {
  const { id } = req.params;

  const product = await crud.readById('products', id);

  if (!product) {
    return res.status(422).json(errorResponse('invalid_data', 'Wrong id format'));
  }

  req.product = product;

  return next();
};

const validateSales = (req, res, next) => {
  const { body } = req;
  for (let i = 0; i < body.length; i += 1) {
    if (body[i].quantity < 1 || !Number.isInteger(body[i].quantity)) {
      return res
        .status(422)
        .json(errorResponse('invalid_data', 'Wrong product ID or invalid quantity'));
    }
  }
  return next();
};

const verifyIfSaleExistsById = async (req, res, next) => {
  const sale = await crud.readById('sales', req.params.id);
  if (!sale) {
    return res.status(422).json(errorResponse('invalid_data', 'Wrong sale ID format'));
  }
  req.sale = sale;
  return next();
};

module.exports = {
  validateNameLength,
  verifyIfProductExistsById,
  validateQuantity,
  verifyIfProductExistsByName,
  verifyIfSaleExistsById,
  validateSales,
};
