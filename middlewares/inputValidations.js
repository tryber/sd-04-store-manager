const crudModel = require('../models/crudModel');

const buildResponse = (code, message) => ({ err: { code, message } });

const validateNameLength = (req, res, next) => {
  const { name } = req.body;

  if (name.length < 5) {
    return res.status(422).json(buildResponse('invalid_data', '"name" length must be at least 5 characters long'));
  }

  next();
};

const verifyIfProductExists = async (req, res, next) => {
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
    return res.status(422).json(buildResponse('invalid_data', '"quantity" must be larger than or equal to 1'));
  }

  if (!Number.isInteger(quantity)) {
    return res.status(422).json(buildResponse('invalid_data', '"quantity" must be a number'));
  }

  next();
};

const verifyIfProductExistsById = async (req, res, next) => {
  const { id } = req.params;

  const product = await crudModel.findById('products', id);

  if (!product) {
    return res.status(422).json(buildResponse('invalid_data', 'Wrong id format'));
  }

  req.product = product;

  next();
};

const validateSales = (req, res, next) => {
  const { body } = req;
  for (let i = 0; i < body.length; i += 1) {
    if (body[i].quantity < 1 || !Number.isInteger(body[i].quantity)) {
      return res.status(422).json(buildResponse('invalid_data', 'Wrong product ID or invalid quantity'));
    }
  }
  next();
};

const verifyIfSaleExistsById = async (req, res, next) => {
  const sale = await crudModel.findById('sales', req.params.id);
  if (!sale) {
    return res.status(422).json(buildResponse('invalid_data', 'Wrong sale ID format'));
  }
  req.sale = sale;
  next();
};

module.exports = {
  validateNameLength,
  verifyIfProductExists,
  validateQuantity,
  verifyIfProductExistsById,
  validateSales,
  verifyIfSaleExistsById,
};
