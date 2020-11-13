const dbModel = require('../models/dbModel');

const nameValidationMiddleware = (req, res, next) => {
  const { name } = req.body;
  let error;
  if (name.length < 5) {
    error = {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    };
  }
  if (error) {
    return res.status(422).json(error);
  }
  return next();
};
const productValidationMiddleware = async (req, res, next) => {
  const { name } = req.body;
  const product = await dbModel.findByName(name, 'products');
  let error;
  if (product) {
    error = {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }
  if (error) {
    return res.status(422).json(error);
  }
  return next();
};
const quantityValidationMiddleware = (req, res, next) => {
  const { quantity } = req.body;
  let error;
  if (quantity <= 0) {
    error = {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    };
  }
  if (isNaN(quantity)) {
    error = {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    };
  }
  if (error) {
    return res.status(422).json(error);
  }
  return next();
};

module.exports = {
  nameValidationMiddleware,
  productValidationMiddleware,
  quantityValidationMiddleware,
};
