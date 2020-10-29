const { findAll, findById } = require('../models/productModel');

const HTTPSTATUS = {
  OK: 200,
  INTERN_ERROR: 500,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
  CREATED: 201,
};

// const messages = {
//   namecheck: '"name" length must be at least 5 characters long',
//   nameUnique: 'Product already exists',
//   quantityTaille: '"quantity" must be larger than or equal to 1',
//   quantityNumber: '"quantity" must be a number',
// };

const buildResponse = (message, code) => ({
  err: {
    code,
    message,
  },
});

const errorsMessagesGenerator = (res, message, code) => {
  switch (code) {
    case 'invalid_data':
      console.log(message);
      return res.status(HTTPSTATUS.UNPROCESSABLE_ENTITY).json(buildResponse(message, code));
    case 'not_found':
      return res.status(HTTPSTATUS.NOT_FOUND).json(buildResponse(message, code));
    default:
      return res
        .status(HTTPSTATUS.INTERN_ERROR)
        .json({ error: { message: 'Erro inesperado', code: HTTPSTATUS.INTERN_ERROR } });
  }
};

const validateProduct = async (req, res, next) => {
  const { name, quantity } = req.body;
  const list = await findAll();
  const productsNames = await new Set(list.map((product) => product.name));
  if (!/\w{5,}/.test(name)) {
    return errorsMessagesGenerator(
      res,
      '"name" length must be at least 5 characters long',
      'invalid_data',
    );
  }
  if (productsNames.has(name)) {
    return errorsMessagesGenerator(res, 'Product already exists', 'invalid_data');
  }
  if (quantity <= 0) {
    return errorsMessagesGenerator(
      res,
      '"quantity" must be larger than or equal to 1',
      'invalid_data',
    );
  }
  if (!Number.isInteger(quantity)) {
    return errorsMessagesGenerator(res, '"quantity" must be a number', 'invalid_data');
  }
  next();
};

const validateProductById = async (req, res, next) => {
  const { id } = req.params;

  const product = await findById('products', id);

  if (!product) {
    return res.status(422).json(buildResponse('invalid_data', 'Wrong id format'));
  }

  req.product = product;

  next();
};

module.exports = { validateProduct, validateProductById };
