const validator = require('validator');
const productModel = require('../models/productModel');

const add = async (name, quantity) => {
  if (!validator.isLength(name, { min: 5 })) {
    return {
      error: true, message: '"name" length must be at least 5 characters long',
    };
  }
  if (!validator.isInt(quantity.toString(), { gt: 0 })) {
    if (quantity <= 0) {
      return {
        error: true, message: '"quantity" must be larger than or equal to 1',
      };
    }
    return {
      error: true, message: '"quantity" must be a number',
    };
  }
  const checkName = await productModel.getByName(name);
  if (checkName) {
    return {
      error: true, message: 'Product already exists',
    };
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
