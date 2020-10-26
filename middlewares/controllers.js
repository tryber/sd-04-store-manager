const getAll = ({ model, resJson }) => async (_req, res) => {
  const item = await model.getAll();
  if (item && resJson === 'products') {
    return res.status(200).json({ products: item });
  }
  if (item && resJson === 'sales') {
    return res.status(200).json({ sales: item });
  }
  if (!item && resJson === 'products') {
    return res.status(422).send({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }
  if (!item && resJson === 'sales') {
    return res.status(404).send({
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    });
  }
};

const getById = ({ status, message, code, model }) => async (req, res) => {
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

const exclude = (message, model) => async (req, res) => {
  const { id } = req.params;
  const item = await model.getById(id);
  const itemExclude = await model.exclude(id);
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
