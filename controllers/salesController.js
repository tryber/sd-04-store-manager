const model = require('../models/commonModel');

const listSales = async (_, res) => {
  const sales = await model.getAll('sales');
  const status = 200;
  return res.status(status).json({ sales });
};

module.exports = {
  listSales,
};
