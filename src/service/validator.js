const { findAll, findById } = require('../models/productModel');

const HTTPSTATUS = {
  OK: 200,
  INTERN_ERROR: 500,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
  CREATED: 201,
};

const MSG = {
  name: '"name" length must be at least 5 characters long',
  nameUnique: 'Product already exists',
  quantityTaille: '"quantity" must be larger than or equal to 1',
  quantityNumber: '"quantity" must be a number',
  invalid_data: 'invalid_data',
  not_found: 'not_found',
  unexpected_error: 'Erro inesperado',
  id_format: 'Wrong id format',
};

const buildResponse = (message, code) => ({
  err: {
    code,
    message,
  },
});

const errorsMessagesGenerator = (res, message, code) => {
  switch (code) {
    case invalid_data:
      console.log(message);
      return res.status(HTTPSTATUS.UNPROCESSABLE_ENTITY).json(buildResponse(message, code));
    case not_found:
      return res.status(HTTPSTATUS.NOT_FOUND).json(buildResponse(message, code));
    default:
      return res
        .status(HTTPSTATUS.INTERN_ERROR)
        .json({ error: { message: MSG.unexpected_error, code: HTTPSTATUS.INTERN_ERROR } });
  }
};

const validateProduct = async (req, res, next) => {
  const { name, quantity } = req.body;
  const list = await findAll();
  const productsNames = new Set(list.map((product) => product.name));
  if (!/\w{5,}/.test(name)) {
    return errorsMessagesGenerator(res, MSG.name, MSG.invalid_data);
  }
  if (productsNames.has(name)) {
    return errorsMessagesGenerator(res, MSG.nameUnique, MSG.invalid_data);
  }
  if (quantity <= 0) {
    return errorsMessagesGenerator(res, MSG.namecheck, MSG.invalid_data);
  }
  if (!Number.isInteger(quantity)) {
    return errorsMessagesGenerator(res, MSG.quantityNumber, MSG.invalid_data);
  }
  next();
};

const validateProductById = async (req, res, next) => {
  const { id } = req.params;

  const product = await findById(id);

  if (!product) {
    return errorsMessagesGenerator(res, MSG.id_format, MSG.invalid_data);
  }

  req.product = product;

  next();
};

module.exports = { validateProduct, validateProductById };
