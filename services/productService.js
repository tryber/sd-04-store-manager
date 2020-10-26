const validator = require('validator');
const productModel = require('../models/productModel');

const addValidation = async (name, quantity) => {
  let errorCode = '';
  const checkName = await productModel.getByName(name);
  if (checkName) {
    errorCode = 'Product already exists';
  } else if (!validator.isLength(name, { min: 5 })) {
    errorCode = '"name" length must be at least 5 characters long';
  } else if (!validator.isInt(quantity.toString())) {
    errorCode = '"quantity" must be a number';
  } else if (quantity <= 0) {
    errorCode = '"quantity" must be larger than or equal to 1';
  }
  return errorCode;
};

const add = async (name, quantity) => {
  const errorCode = await addValidation(name, quantity);

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

const getById = async (id) => {
  const product = await productModel.getById(id);
  return product;
};

module.exports = {
  add,
  getAll,
  getById,
};
