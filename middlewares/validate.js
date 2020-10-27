const ProductModel = require('../model/productModel');
const SalesModel = require('../model/salesModel');

const buildErrors = (code, message) => ({ err: { code, message } });

const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name || name.length < 6) {
    return res
      .status(422)
      .json(buildErrors('invalid_data', '"name" length must be at least 5 characters long'));
  }

  next();
};

const validateIfExistsProduct = async (req, res, next) => {
  const { name } = req.body;

  const product = await ProductModel.getByName(name);

  if (product) res.status(422).json(buildErrors('invalid_data', 'Product already exists'));

  next();
};

const validateQuantity = async (req, res, next) => {
  const { quantity } = req.body;

  if (!Number.isInteger(quantity)) {
    return res.status(422).json(buildErrors('invalid_data', '"quantity" must be a number'));
  }

  if (quantity < 1) {
    return res
      .status(422)
      .json(buildErrors('invalid_data', '"quantity" must be larger than or equal to 1'));
  }

  next();
};

const validateSale = (req, res, next) => {
  const sale = req.body;
  for (let i = 0; i < sale.length; i += 1) {
    if (sale[i].quantity < 1 || !Number.isInteger(sale[i].quantity)) {
      return res
        .status(422)
        .json(buildErrors('invalid_data', 'Wrong product ID or invalid quantity'));
    }
  }
  next();
};

const validateIfExistsSale = async (req, res, next) => {
  const { id } = req.params;
  const sale = await SalesModel.getById(id);

  if (!sale) {
    return res.status(422).json(buildErrors('invalid_data', 'Wrong sale ID format'));
  }

  req.sale = sale; // envia a sale para o pŕoximo middleware atraves do req.sale.
  next();
};

module.exports = {
  buildErrors,
  validateName,
  validateIfExistsProduct,
  validateQuantity,
  validateSale,
  validateIfExistsSale,
};
