const statusInvalidData = (res, code, message) => {
  res.status(422).json({
    err: { code, message },
  });
};

const countMoreThenZero = (res) => {
  statusInvalidData(res, 'invalid_data', 'Wrong product ID or invalid quantity');
};

module.exports = {
  countMoreThenZero,
};
