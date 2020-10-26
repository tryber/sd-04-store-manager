const validator = require('validator');
const productModel = require('../models/productModel');

const add = async (name, quantity) => {
  let errorCode = '';
  if (!validator.isLength(name, { min: 5 })) {
    errorCode = '"name" length must be at least 5 characters long';
  } else if (!validator.isInt(quantity.toString(), { gt: 0 })) {
    if (quantity <= 0) {
      errorCode = '"quantity" must be larger than or equal to 1';
    }
    errorCode = '"quantity" must be a number';
  }

  const checkName = await productModel.getByName(name);
  if (checkName) {
    errorCode = 'Product already exists';
  }
  if (errorCode) {
    return errorCode;
  }
  const newProduct = await productModel.add(name, quantity);
  return newProduct;
};

const getAll = async () => {
  const products = await productModel.getAll();
  return products;
};

module.exports = {
  add,
  getAll,
};
