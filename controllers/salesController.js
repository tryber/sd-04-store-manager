const model = require('../models/commonModel');

const listAll = async (_, res) => {
  const sales = await model.getAll('sales');
  const status = 200;
  return res.status(status).json({ sales });
};

const add = async (req, res) => {
  const [...products] = req.body;
  const newSale = await model.add('sales', ...products);
  res.status(200).json(newSale);
};

module.exports = {
  listAll,
  add,
};
