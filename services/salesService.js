const salesModel = require('../models/salesModel');

const getAll = async () => {
  const sales = await salesModel.getAllSales();
  return sales;
};

const deleteSale = async (id) => {
  const sale = await salesModel.getSaleById(id);

  if (!sale) return null;
  await salesModel.deleteSale(id);
  return sale;
};

module.exports = { getAll, deleteSale };
