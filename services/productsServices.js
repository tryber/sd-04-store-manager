const Products = require('../models/productsModel');

// VALIDAÇÃO E CRIAÇÃO DO PRODUTO ------------------------------------------------------------
const isValid = async (name, quantity) => {
  const err = { code: 'invalid_data' };

  if (name.length < 5) err.message = '"name" length must be at least 5 characters long';
  if (await Products.getProductByName(name)) err.message = 'Product already exists';
  if (quantity < 1 || quantity < 0) err.message = '"quantity" must be larger than or equal to 1';
  if (typeof quantity !== 'number') err.message = '"quantity" must be a number';

  return err;
};

const createProduct = async (name, quantity) => {
  const err = await isValid(name, quantity);
  if (err.message) return { err, error: true };

  const product = await Products.createProduct(name, quantity);
  return { _id: product.insertedId, name, quantity };
};

// LISTA TODOS OS PRODUTOS -------------------------------------------------------------------
const getAllProducts = async () => {
  const products = await Products.getAllProducts();
  return { products };
};

// LISTA PRODUTO POR ID ----------------------------------------------------------------------
const getProductById = async (id) => {
  const product = await Products.getProductById(id);
  const err = { err: { code: 'invalid_data', message: 'Wrong id format' }, error: true };

  //   return product ? product : err;
  if (!product) return err;
  return product;
};

// ATUALIZA UM PRODUTO -----------------------------------------------------------------------
const updateProduct = async (id, name, quantity) => {
  const err = await isValid(name, quantity);
  if (err.message) return { err, error: true };

  const product = await Products.updateProduct(id, name, quantity);
  return { _id: product.insertedId, name, quantity };
};

// EXCLUI UM PRODUTO -------------------------------------------------------------------------
const deleteProduct = async (id) => {
  const product = await Products.getProductById(id);
  const err = { err: { code: 'invalid_data', message: 'Wrong id format' }, error: true };

  await Products.deleteProduct(id);
  //   return product ? product : err;
  if (!product) return err;
  return product;
};

module.exports = { createProduct, getAllProducts, getProductById, deleteProduct, updateProduct };
