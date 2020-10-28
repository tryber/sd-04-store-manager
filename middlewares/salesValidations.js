const productValidations = require('../middlewares/productValidations');
const salesModel = require('../model/salesModel');

const buildResponse = productValidations.buildResponse;

const saleQuantityValidation = (req, res, next) => {
  const { quantity } = req.body[0];

  if (quantity <= 0 || typeof quantity !== 'number') {
    return res
      .status(422)
      .json(buildResponse('invalid_data', 'Wrong product ID or invalid quantity'));
  }
  next();
};

const returnAllSales = async (req, res, next) => {
  const salesList = await salesModel.listSales();
  if (!salesList) {
    res.status(422).json(buildResponse('invalid_data', 'A lista não existe'));
  }
  next();
};

module.exports = { saleQuantityValidation, returnAllSales };
