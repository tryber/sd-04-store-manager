const status = (res, code, message) => {
  res.status(422).json({
    err: { code, message },
  });
};

const countProductSize = (res) => {
  status(res, 'invalid_data', '"name" length must be at least 5 characters long');
};

const countMoreThenZero = (res) => {
  status(res, 'invalid_data', '"quantity" must be larger than or equal to 1');
};

const verifyString = (res) => {
  status(res, 'invalid_data', '"quantity" must be a number');
};

const verifyWithExist = (res) => {
  status(res, 'invalid_data', 'Product already exists');
};

const verifyProductById = (res) => {
  status(res, 'invalid_data', 'Wrong id format');
};

module.exports = {
  countProductSize,
  countMoreThenZero,
  verifyString,
  verifyWithExist,
  verifyProductById,
};
