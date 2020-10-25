const statusInvalidData = (res, code, message) => {
  res.status(422).json({
    err: { code, message },
  });
};

const statusInvalidDataStock = (res, code, message) => {
  res.status(404).json({
    err: { code, message },
  });
};

const countProductSize = (res) => {
  statusInvalidData(res, 'invalid_data', '"name" length must be at least 5 characters long');
};

const countMoreThenZero = (res) => {
  statusInvalidData(res, 'invalid_data', '"quantity" must be larger than or equal to 1');
};

const verifyString = (res) => {
  statusInvalidData(res, 'invalid_data', '"quantity" must be a number');
};

const verifyWithExist = (res) => {
  statusInvalidData(res, 'invalid_data', 'Product already exists');
};

const verifyProductById = (res) => {
  statusInvalidData(res, 'invalid_data', 'Wrong id format');
};

const wrongIdFormat = (res) => {
  statusInvalidData(res, 'invalid_data', 'Wrong product ID or invalid quantity');
};

const wrongSaleId = (res) => {
  statusInvalidData(res, 'invalid_data', 'Wrong sale ID format');
};

const stockProblem = (res) => {
  statusInvalidDataStock(res, 'stock_problem', 'Such amount is not permitted to sell');
};
module.exports = {
  countProductSize,
  countMoreThenZero,
  verifyString,
  verifyWithExist,
  verifyProductById,
  wrongIdFormat,
  wrongSaleId,
  stockProblem,
};
