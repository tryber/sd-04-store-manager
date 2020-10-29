const productsModel = require('../models/productsModel');

const buildResponse = (code, message) => {
  return { err: { code, message } };
};

// name
const validateLengthOfName = (req, res, next) => {
  const { name } = req.body;

  if (name.length < 5) {
    return res
      .status(422)
      .json(buildResponse('invalid_data', '"name" length must be at least 5 characters long'));
  }

  next();
};

const validateProductExistsByName = async (req, res, next) => {
  const { name } = req.body;
  const product = await productsModel.findByName(name);

  if (product) {
    return res.status(422).json(buildResponse('invalid_data', 'Product already exists'));
  }

  next();
};

// Id - valida se o produto exite por Id
const validateProductExistsById = async (req, res, next) => {
  const { id } = req.params;
  const product = await productsModel.findById(id);

  if (!product) {
    return res.status(422).json(buildResponse('invalid_data', 'Wrong id format'));
  }

  req.product = product;
  next();
};

// quantity
const validateQuantityIsMoreThanZero = (req, res, next) => {
  const { quantity } = req.body;

  if (quantity <= 0) {
    return res
      .status(422)
      .json(buildResponse('invalid_data', '"quantity" must be larger than or equal to 1'));
  }

  next();
};

const validateQuantityIsNumber = (req, res, next) => {
  const { quantity } = req.body;

  if (!Number.isInteger(quantity)) {
    return res.status(422).json(buildResponse('invalid_data', '"quantity" must be a number'));
  }

  next();
};

module.exports = {
  validateLengthOfName,
  validateProductExistsByName,
  validateProductExistsById,
  validateQuantityIsMoreThanZero,
  validateQuantityIsNumber,
};
