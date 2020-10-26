const getAll = (model, resJson, status, code, message) => async (_req, res) => {
  const item = await model.getAll();
  if (item) {
    return res.status(200).json({ products: item });
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
