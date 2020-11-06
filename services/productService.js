const validator = require('validator');
const productModel = require('../models/productModel');

const productValidation = async (id, name, quantity) => {
  let errorCode = '';
  const checkName = await productModel.getByName(name);
  if (checkName && id === '0') {
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
  const errorCode = await productValidation('0', name, quantity);

  if (errorCode) {
    return errorCode;
  }
  const newProduct = await productModel.add(name, quantity);
  return newProduct;
};

const update = async (id, name, quantity) => {
  const errorCode = await productValidation(id, name, quantity);

  if (errorCode) {
    return errorCode;
  }
  const updatedProduct = await productModel.update(id, name, quantity);
  return updatedProduct;
};

const del = async (id) => {
  try {
    const deletedProduct = await productModel.del(id);
    return deletedProduct;
  } catch (e) {
    return { n: 0 };
  }
};

const getAll = async () => {
  const products = await productModel.getAll();
  return products;
};

const getById = async (id) => {
  try {
    const product = await productModel.getById(id);
    return product;
  } catch (e) {
    return null;
  }
};

module.exports = {
  add,
  getAll,
  getById,
  update,
  del,
};
