const salesModel = require('../models/salesModel');
// const validadeSale = require('./salesValid');
const productsModel = require('../models/productsModel');

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

// const getById = async (id) => {
//   const product = await productsModel.findById(id);
//   const err = { err: { code: 'invalid_data', message: 'Wrong id format' }, error: true };

//   if (!product) return err;
//   return product;
// };

//   const product = await productsModel.addProduct(name, quantity);
//   return { _id: product.insertedId, name, quantity };
// };

// const updateProduct = async (id, name, quantity) => {
//   const err = await isValid(name, quantity);
//   if (err.message) return { err, error: true };

//   const product = await productsModel.updateProduct(id, name, quantity);
//   return { _id: product.insertedId, name, quantity };
// };

// const deleteProduct = async (id) => {
//   const product = await productsModel.findById(id);
//   const err = { err: { code: 'invalid_data', message: 'Wrong id format' }, error: true };

//   await productsModel.deleteProduct(id);
//   if (!product) return err;
//   return product;
// };

module.exports = {
  createSale,
  // updateSale,
  // deleteSale,
  getAll,
  getById,
};
