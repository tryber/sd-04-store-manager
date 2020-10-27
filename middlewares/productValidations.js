const model = require('../models/commonModel');

const lengthValidation = (req, res, next) => {
  const { name } = req.body;

  if (name.length < 5) {
    return res.status(422).json({
      err: { code: 'invalid_data', message: '"name" length must be at least 5 characters long' },
    });
  }
  next();
};

const uniqueNameValidation = async (req, res, next) => {
  const { name } = req.body;
  const products = await model
    .getAll('products')
    .then((names) => names.find((productName) => productName.name === name));
  if (products) {
    return res.status(422).json({
      err: { code: 'invalid_data', message: 'Product already exists' },
    });
  }
  next();
};

const quantityValidation = (req, res, next) => {
  const { quantity } = req.body;
  if (quantity <= 0) {
    return res.status(422).json({
      err: { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' },
    });
  }
  next();
};

const quantityTypeOfValidation = (req, res, next) => {
  const { quantity } = req.body;
  if (!Number.isInteger(quantity)) {
    return res.status(422).json({
      err: { code: 'invalid_data', message: '"quantity" must be a number' },
    });
  }
  next();
};

module.exports = {
  lengthValidation,
  uniqueNameValidation,
  quantityValidation,
  quantityTypeOfValidation,
};
