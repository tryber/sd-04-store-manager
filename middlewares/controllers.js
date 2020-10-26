const models = require('./models');

const getAll = (table, status, code, message) => async (_req, res) => {
  const item = await models.getAll(table);
  if (item && table === 'products') {
    return res.status(200).json({ products: item });
  }
  if (item && table === 'sales') {
    return res.status(200).json({ sales: item });
  }
  return res.status(status).send({
    err: {
      code,
      message,
    },
  });
};

const getById = (model, status, code, message) => async (req, res) => {
  const { id } = req.params;
  const item = await model.getById(id);
  if (item) {
    return res.status(200).json(item);
  }
  return res.status(status).send({
    err: {
      code,
      message,
    },
  });
};

const exclude = (message, model, table) => async (req, res) => {
  const { id } = req.params;
  const item = await model.getById(id);
  const itemExclude = await models.exclude(table, id);
  if (item && itemExclude) {
    return res.status(200).json(item);
  }
  return res.status(422).send({
    err: {
      code: 'invalid_data',
      message,
    },
  });
};

module.exports = {
  getAll,
  getById,
  exclude,
};
