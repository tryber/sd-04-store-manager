const salesModel = require('../models/salesModel');

const deleteSale = async (id) => {
  const sale = await salesModel.getSaleById(id);
  const err = { err: { code: 'invalid_data', message: 'Wrong sale ID format' } };

  if (!sale) return err;
  await salesModel.deleteSale(id);
  return sale;
};

module.exports = { deleteSale };
