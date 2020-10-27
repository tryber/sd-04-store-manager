const model = require('../models/commonModel');

const readSales = async (_, res) => {
  const sales = await model.getAll('sales');
  const status = 200;
  return res.status(status).json({ sales });
};

const readById = async (req, res) => {
  try {
    const sale = await model.findById(req.params.id, 'sales');
    return res.status(200).json(sale);
  } catch (_e) {
    const status = 422;
    res.status(status).json({
      err: { code: 'invalid_data', message: 'Sale not found' },
    });
  }
};

const create = async (req, res) => {
  const [...products] = req.body;
  const add = await model.add(products, 'sales');
  res.status(200).json(add);
};

const update = async (req, res) => {
  const [...products] = req.body;
  await model.update(req.params.id, ...products, 'sales');
  const result = await model.findById(req.params.id, 'sales');
  res.status(200).json(result);
};

// router.delete('/:id', async (_, res) => res.status(200).send('oi'));

module.exports = {
  readSales,
  readById,
  create,
  update,
};
