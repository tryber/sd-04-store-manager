const productsModel = require('../models/productsModel');
const salesModel = require('../models/salesModel');

const deleteSale = async (id) => {
  const sale = await salesModel.getSaleById(id);

  if (!sale) return null;

  await salesModel.deleteSale(id);

  const { productId, quantity } = sale.itensSold[0];
  await productsModel.updateQuantity(productId, -quantity);

  return sale;
};

module.exports = { deleteSale };
