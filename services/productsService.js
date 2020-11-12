const productsModel = require('../models/productsModel');

const isValid = async (name, quantity) => {
  const err = { code: 'invalid_data' };

  if (name.length < 5) err.message = '"name" length must be at least 5 characters long';
  if (await productsModel.findByName(name)) err.message = 'Product already exists';
  if (quantity < 1 || quantity < 0) err.message = '"quantity" must be larger than or equal to 1';
  if (typeof quantity !== 'number') err.message = '"quantity" must be a number';

  return err;
};

const createProduct = async (name, quantity) => {
  const err = await isValid(name, quantity);
  if (err.message) return { err, erro: true };

  const product = await productsModel.addProduct(name, quantity);
  return { _id: product.insertedId, name, quantity };
};

module.exports = { createProduct };
