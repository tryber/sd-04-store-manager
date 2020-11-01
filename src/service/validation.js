const { productModel } = require('../models');

const HTTPSTATUS = {
  OK: 200,
  INTERN_ERROR: 500,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
  CREATED: 201,
};

const messages = {
  namecheck: '"name" length must be at least 5 characters long',
  nameUnique: 'Product already exists',
  quantityTaille: '"quantity" must be larger than or equal to 1',
  quantityNumber: '"quantity" must be a number',
  default: 'Wrong product ID or invalid quantity',
};

const messageError = (message, code) => ({
  err: {
    code,
    message,
  },
});

const errorsMessagesGenerator = (res, message, code) => {
  switch (code) {
    case 'invalid_data':
      return res.status(HTTPSTATUS.UNPROCESSABLE_ENTITY).json(messageError(message, code));
    case 'not_found':
      return res.status(HTTPSTATUS.NOT_FOUND).json(messageError(message, code));
    default:
      return res
        .status(HTTPSTATUS.INTERN_ERROR)
        .json({ error: { message: 'Erro inesperado', code: HTTPSTATUS.INTERN_ERROR } });
  }
};

const quantities = async (req, res, next) => {
  const { name, quantity } = req.body;
  if (!/\w{5,}/.test(name)) {
    return errorsMessagesGenerator(res, messages.namecheck, 'invalid_data');
  }
  if (quantity <= 0) {
    return errorsMessagesGenerator(res, messages.quantityTaille, 'invalid_data');
  }
  if (!Number.isInteger(quantity)) {
    return errorsMessagesGenerator(res, messages.quantityNumber, 'invalid_data');
  }
  next();
};

const equality = async (req, res, next) => {
  const { name } = req.body;
  const list = await productModel.listProducts();
  const productsNames = await new Set(list.map((product) => product.name));
  if (productsNames.has(name)) {
    return errorsMessagesGenerator(res, messages.nameUnique, 'invalid_data');
  }
  next();
};

const saleQuantity = async (req, res, next) => {
  const salesArray = req.body;
  let invalidData = false;
  salesArray.forEach((sale) => {
    const { productID, quantity } = sale;
    if (quantity <= 0 || !Number.isInteger(quantity)) {
      return (invalidData = true);
    }
  });
  if (invalidData) errorsMessagesGenerator(res, messages.default, 'invalid_data');
  return next();
};

module.exports = { quantities, equality, saleQuantity };
