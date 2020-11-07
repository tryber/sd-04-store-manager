const { productModels } = require('../models');
const { errorsMessages } = require('./errors');

const validationNameQuantity = (req, res, next) => {
  const { name, quantity } = req.body;

  if (!Number.isNaN(Number(name)) || name.length < 5) {
    return errorsMessages(res, '"name" length must be at least 5 characters long', 'invalid_data');
  }
  if (quantity <= 0) {
    return errorsMessages(res, '"quantity" must be larger than or equal to 1', 'invalid_data');
  }
  if (Number.isNaN(Number(quantity))) {
    return errorsMessages(res, '"quantity" must be a number', 'invalid_data');
  }
  next();
};

const validationExistProd = async (req, res, next) => {
  try {
    const { name } = req.body;
    const existOrNotProduct = await productModels.getProdByName(name);
    if (existOrNotProduct) {
      return errorsMessages(res, 'Product already exists', 'invalid_data');
    }
    next();
  } catch (err) {
    console.error('validationExistProd', err);
  }
};

const validationNameUpdate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const idExist = await productModels.getProdByName(name);
    if (idExist && id !== idExist.id) {
      return errorsMessages(res, 'Product already exists', 'invalid_data');
    }
    next();
  } catch (err) {
    console.error('validationNameUpdate', err);
  }
};

module.exports = { validationNameQuantity, validationExistProd, validationNameUpdate };
