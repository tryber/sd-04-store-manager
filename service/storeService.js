const countProductSize = (res) => {
  res.status(422).json({
    err: { code: 'invalid_data', message: '"name" length must be at least 5 characters long' },
  });
};

const countMoreThenZero = (res) => {
  res.status(422).json({
    err: { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' },
  });
};

const verifyString = (res) => {
  res.status(422).json({
    err: { code: 'invalid_data', message: '"quantity" must be a number' },
  });
};

const verifyWithExist = (res) => {
  res.status(422).json({
    err: { code: 'invalid_data', message: 'Product already exists' },
  });
};

module.exports = {
  countProductSize,
  countMoreThenZero,
  verifyString,
  verifyWithExist,
};
