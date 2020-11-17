const salesModel = require('../models/salesModel');
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

const updateSale = async (id, saleUpdate) => {
  try {
    const sale = await salesModel.updateSale(id, saleUpdate);
    const err = {
      err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' },
      error: true,
    };

    await Promise.all(
      saleUpdate.map((item) => {
        if (item.quantity <= 0 || typeof item.quantity === 'string') throw err;
        return productsModel.updateProduct(item.productId, item.quantity);
      }),
    );

    return sale.value;
  } catch (error) {
    return error;
  }
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

const deleteSale = async (id) => {
  const sale = await salesModel.findById(id);

  if (!sale) return null;

  await salesModel.deleteSale(id);

  const { productId, quantity } = sale.itensSold[0];
  await productsModel.updateProduct(productId, -quantity);

  return sale;
};

module.exports = {
  createSale,
  updateSale,
  deleteSale,
  getAll,
  getById,
};
