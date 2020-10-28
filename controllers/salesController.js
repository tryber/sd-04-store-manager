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
  const status = 200;
  res.status(status).json(newSale);
};

const update = async (req, res) => {
  const [...products] = req.body;
  await model.update('sales', req.params.id, ...products);
  const result = await model.findById('sales', req.params.id, ...products);
  const status = 200;
  res.status(status).json(result);
};

const exclude = async (req, res) => {
  try {
    const removed = await model.findById('sales', req.params.id);
    await model.exclude('sales', req.params.id);
    const status = 200;
    res.status(status).json(removed);
  } catch (err) {
    res.status(422).json({
      err: { code: 'invalid_data', message: 'Wrong sale ID format' },
    });
  }
};

module.exports = {
  listAll,
  findById,
  add,
  update,
  exclude,
};
