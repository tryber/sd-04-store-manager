const productsModel = require('../models/productsModel');

const validator = async (name, quantity) => {
  const err = { code: 'invalid_data' };

  if (name.length < 5) err.message = '"name" length must be at least 5 characters long';
  if (await productsModel.getProductByName(name)) err.message = 'Product already exists';
  if (quantity < 1) err.message = '"quantity" must be larger than or equal to 1';
  if (typeof quantity !== 'number') err.message = '"quantity" must be a number';

  return err;
};

const addProduct = async (name, quantity) => {
  const err = await validator(name, quantity);

  if (err.message) return { err };

  const product = await productsModel.addProduct(name, quantity);
  return { _id: product.insertedId, name, quantity };
};

const updateProduct = async (id, name, quantity) => {
  const err = await validator(name, quantity);

  if (err.message) return { err };

  const product = await productsModel.updateProduct(id, name, quantity);
  return { _id: product.insertedId, name, quantity };
};

const deleteProduct = async (id) => {
  const product = await productsModel.getProductById(id);
  const err = { err: { code: 'invalid_data', message: 'Wrong id format' } };

  await productsModel.deleteProduct(id);
  if (!product) return err;
  return product;
};

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
};
