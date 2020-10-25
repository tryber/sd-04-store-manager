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

module.exports = exclude;
