const salesModel = require('../model/salesModel');

const productValidations = require('../middlewares/productValidations');
const buildResponse = productValidations.buildResponse;

const saleQuantityValidation = (req, res, next) => {
  const { quantity } = req.body[0];

  if (quantity <= 0 || typeof quantity !== "number") {
    return res
      .status(422)
      .json(buildResponse('invalid_data', 'Wrong product ID or invalid quantity'));
  }
  next();
};

module.exports = { saleQuantityValidation };
