const model = require('../models/model');

const jsonError = (code, message) => ({ err: { code, message } });

const productIdExists = async (req, res, next) => {
  const { id } = req.params;
  const product = await model.getProductOrSaleById(id, 'products');
  if (!product) {
    return res.status(422).json(jsonError('invalid_data', 'Wrong id format'));
  }
  return next();
};

const nameLength = async (req, res, next) => {
  const { name } = req.body;
  if (name.length < 5) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    });
  }
  return next();
};

const nameExists = async (req, res, next) => {
  const { name } = req.body;
  const product = await model.getProductByName(name);
  if (product) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    });
  }
  return next();
};

const quantityValue = async (req, res, next) => {
  const { quantity } = req.body;
  if (quantity < 1) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    });
  }
  return next();
};

const quantityType = async (req, res, next) => {
  const { quantity } = req.body;
  if (typeof quantity !== 'number') {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    });
  }
  return next();
};

module.exports = {
  nameLength,
  nameExists,
  quantityValue,
  quantityType,
  productIdExists,
  jsonError,
};
