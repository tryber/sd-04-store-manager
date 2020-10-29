const product = require('../models/commonModel');

const result = (res) => res.status(422).json({
  err: { code: 'invalid_data', message: '"name" length must be at least 5 characters long' },
});

const lengthValidation = (req, res, next) => {
  const { name } = req.body;

  if (name.length < 5) {
    return result(res);
  }
  next();
};

const uniqueNameValidation = async (req, res, next) => {
  const { name } = req.body;
  const products = await product
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
