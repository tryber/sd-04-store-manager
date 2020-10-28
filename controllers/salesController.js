const model = require('../models/commonModel');

const listAll = async (_, res) => {
  const sales = await model.getAll('sales');
  const status = 200;
  return res.status(status).json({ sales });
};

const findById = async (req, res) => {
  try {
    const sale = await model.findById('sales', req.params.id);
    return res.status(200).json(sale);
  } catch (_e) {
    const status = 422;
    res.status(status).json({
      err: { code: 'invalid_data', message: 'Sale not found' },
    });
  }
};

const add = async (req, res) => {
  const [...products] = req.body;
  const newSale = await model.add('sales', ...products);
  res.status(200).json(newSale);
};

const update = async (req, res) => {
  const [...products] = req.body;
  await model.update('sales', req.params.id, ...products);
  const result = await model.findById('sales', req.params.id, ...products);
  res.status(200).json(result);
};

module.exports = {
  listAll,
  findById,
  add,
  update,
};
