const salesModel = require('../models/salesModel');

const deleteSale = async (id) => {
  const sale = await salesModel.getSaleById(id);
  const err = { err: { code: 'invalid_data', message: 'Wrong sale ID format' } };

  await salesModel.deleteSale(id);
  if (!sale) return err;
  return sale;
};

module.exports = { deleteSale };
