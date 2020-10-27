const model = require('../models/commonModel');

const productLengthValidation = (req, res, next) => {
  const { name } = req.body;

  if (name.length < 5) {
    return res.status(422).json({
      err: { code: 'invalid_data', message: '"name" length must be at least 5 characters long' },
    });
  }
  next();
};

const productUniqueNameValidation = async (req, res, next) => {
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

const productQuantityValidation = (req, res, next) => {
  const { quantity } = req.body;
  if (quantity <= 0) {
    return res.status(422).json({
      err: { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' },
    });
  }
  next();
};

const productQuantityTypeOfValidation = (req, res, next) => {
  const { quantity } = req.body;
  if (!Number.isInteger(quantity)) {
    return res.status(422).json({
      err: { code: 'invalid_data', message: '"quantity" must be a number' },
    });
  }
  next();
};

module.exports = {
  productLengthValidation,
  productUniqueNameValidation,
  productQuantityValidation,
  productQuantityTypeOfValidation,
};
