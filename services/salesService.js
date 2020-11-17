const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

// const isValid = async (name, quantity) => {
//   const err = { code: 'invalid_data' };

//   if (name.length < 5) err.message = '"name" length must be at least 5 characters long';
//   if (await productsModel.findByName(name)) err.message = 'Product already exists';
//   if (quantity < 1 || quantity < 0) err.message = '"quantity" must be larger than or equal to 1';
//   if (typeof quantity !== 'number') err.message = '"quantity" must be a number';

//   return err;
// };

const createSale = async (item) => {
  const sale = await salesModel.addSale(item);
  const err = {
    err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' },
    error: true,
  };

  const { productId, quantity } = sale.itensSold[0];
  await productsModel.updateProduct(productId, quantity);

  if (quantity <= 0 || typeof quantity === 'string') return err;
  return sale;
};

// ta errado, arrumar pra passar o req 7 depois!
const updateSale = async (id, saleUpdate) => {
  const sale = await salesModel.updateSale(id, saleUpdate);
  const err = {
    err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' },
    error: true,
  };

  const { productId, quantity } = sale.itensSold;
  await productsModel.updateProduct(productId, quantity);

  if (quantity <= 0 || typeof quantity === 'string') return err;
  return sale;
};

// const updateProduct = async (id, name, quantity) => {
//   const err = await isValid(name, quantity);
//   if (err.message) return { err, error: true };

//   const product = await productsModel.updateProduct(id, name, quantity);
//   return { _id: product.insertedId, name, quantity };
// };

const getAll = async () => {
  const sales = await salesModel.findAll();
  if (!sales) return null;
  return { sales };
};

const getById = async (id) => {
  const sale = await salesModel.findById(id);
  const err = { err: { code: 'not_found', message: 'Sale not found' }, error: true };

  if (!sale) return err;
  return sale;
};

// const deleteProduct = async (id) => {
//   const product = await productsModel.findById(id);
//   const err = { err: { code: 'invalid_data', message: 'Wrong id format' }, error: true };

//   await productsModel.deleteProduct(id);
//   if (!product) return err;
//   return product;
// };

module.exports = {
  createSale,
  updateSale,
  // deleteSale,
  getAll,
  getById,
};
