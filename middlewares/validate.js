const ProductModel = require('../model/productModel');

const buildErrors = (code, message) => {
  return { err: { code, message } };
};

const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name || name.length < 6)
    return res
      .status(422)
      .json(buildErrors('invalid_data', '"name" length must be at least 5 characters long'));

  next();
};

const validateIfExistsProduct = async (req, res, next) => {
  const { name } = req.body;

  const product = await ProductModel.getByName(name);

  if (product)
    return res
      .status(422)
      .json(buildErrors('invalid_data', 'Product already exists'));

  next();
};

const validateQuantity = async (req, res, next) => {
  const { quantity } = req.body;

  if (!Number.isInteger(quantity))
    return res
      .status(422)
      .json(buildErrors('invalid_data', '"quantity" must be a number'));
  
  if(quantity < 1) return res.status(422).json(buildErrors('invalid_data', '"quantity" must be larger than or equal to 1'));

  next();
};

module.exports = {
  buildErrors,
  validateName,
  validateIfExistsProduct,
  validateQuantity
};
