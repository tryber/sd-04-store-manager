const salesModel = require('../models/salesModel');
// const validadeSale = require('./salesValid');
const productsModel = require('../models/productsModel');

const createSale = async (item) => {
  const sale = await salesModel.addSale(item);
  const err = { err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' }, error: true };

  const { productId, quantity } = sale.itensSold[0];
  await productsModel.updateProduct(productId, quantity);

  if (quantity <= 0 || typeof quantity === 'string') return err;
  return sale;
};

const getAll = async () => ({ sales: await salesModel.findAll() });

module.exports = { getAll, createSale };
