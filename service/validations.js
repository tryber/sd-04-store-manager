const Model = require('../model/product');

const buildError = (code, message, status) => {
  return {
    error: { err: { code, message } },
    status,
  }
}

const errorMessage = [
  '"name" length must be at least 5 characters long',
  'Product already exists',
  '"quantity" must be larger than or equal to 1',
  '"quantity" must be a number',
  'Wrong id format',
];

const isInvalidName = (name) => {
  if (name.length < 5) {
    return true;
  }
  return null;
};

const isAlreadyName = async (name) => {
  if (await Model.getProductByName(name)) {
    return true;
  }
  return null;
};

const isProductValid = async (name, quantity) => {
  // console.log('VALIDANDO');
  switch (true) {
    case (isInvalidName(name)):
      return buildError('invalid_data', errorMessage[0], 422);
    case await (isAlreadyName(name)):
      return buildError('invalid_data', errorMessage[1], 422);
    case (quantity < 1):
      return buildError('invalid_data', errorMessage[2], 422);
    case (!Number.isInteger(quantity)):
      return buildError('invalid_data', errorMessage[3], 422);
    default:
      return null;
  }
};

module.exports = {
  isProductValid,
}