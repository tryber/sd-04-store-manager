const produModel = require('../models/productModel');

const validateName = async (req, res, next) => {
  const { name } = req.body;
  const product = await produModel.getOneProductName(name);

  if (name.length < 5) {
    return res.status(422)
      .json({err: {code: 'invalid_data', message: "\"name\" length must be at least 5 characters long" }});
  } else if (product) {
    return res.status(422).json({err: {code: 'invalid_data', message: 'Product already exists' }});
  }

  return next();
};

const validateQuantity = (req, res, next) => {
  const { quantity } = req.body;

  if (quantity <= 0) {
    return res.status(422)
      .json({err: {code: 'invalid_data', message: "\"quantity\" must be larger than or equal to 1" }});
  } else if (!Number.isInteger(quantity)) {
    return res.status(422).json({err: {code: 'invalid_data', message: "\"quantity\" must be a number" }});
  }

  return next();
};

module.exports = { validateName, validateQuantity };
