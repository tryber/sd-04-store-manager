const countProductSize = (res, errorCode) => {
  res.status(errorCode).json({
    err: { code: 'invalid_data', message: '"name" length must be at least 5 characters long' },
  });
};

const countMoreThenZero = (res, errorCode) => {
  res.status(errorCode).json({
    err: { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' },
  });
};

const verifyString = (res, errorCode) => {
  res.status(errorCode).json({
    err: { code: 'invalid_data', message: '"quantity" must be a number' },
  });
};

const verifyWithExist = (res, errorCode) => {
  res.status(errorCode).json({
    err: { code: 'invalid_data', message: 'Product already exists' },
  });
};

module.exports = {
  countProductSize,
  countMoreThenZero,
  verifyString,
  verifyWithExist,
};
