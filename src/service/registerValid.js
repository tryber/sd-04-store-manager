const { productModels } = require('../models');
const { errorUnprocessableEntity } = require('./errors');

const validationRegister = async (req, res, next) => {
  const { name, quantity } = req.body;
  const existOrNotProduct = await productModels.getProdByName(name);
  if (!Number.isNaN(Number(name)) || name.length < 5) {
    return errorUnprocessableEntity(res, '"name" length must be at least 5 characters long');
  }
  if (quantity <= 0) {
    return errorUnprocessableEntity(res, '"quantity" must be larger than or equal to 1');
  }
  if (Number.isNaN(Number(quantity))) {
    return errorUnprocessableEntity(res, '"quantity" must be a number');
  }
  if (existOrNotProduct) {
    return errorUnprocessableEntity(res, 'Product already exists');
  }
  next();
};

module.exports = validationRegister;
