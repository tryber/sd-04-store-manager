const salesModel = require('../models/salesModel');

const deleteSale = async (id) => {
  const sale = await salesModel.getSaleById(id);

  if (!sale) return null;
  await salesModel.deleteSale(id);
  return sale;
};

module.exports = { deleteSale };
