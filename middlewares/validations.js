const productsModel = require('../models/productsModel');

const buildError = (code, message) => ({ err: { code, message } });

const nameValidation = (req, res, next) => {
  const { name } = req.body;

  if (!name || name.length < 6) {
    return res
      .status(422)
      .json(buildError('invalid_data', '"name" length must be at least 5 characters long'));
  }
  next();
};

const quantityValidation = async (req, res, next) => {
  const { quantity } = req.body;

  if (!Number.isInteger(quantity)) {
    return res.status(422).json(buildError('invalid_data', '"quantity" must be a number'));
  }
  if (quantity < 1) return res.status(422).json(buildError('invalid_data', '"quantity" must be larger than or equal to 1'));
  next();
};

const existingNameValidation = async (req, res, next) => {
  const { name } = req.body;
  const product = await productsModel.findByName(name);
  if (product) {
    return res.status(422).json(buildError('invalid_data', 'Product already exists'));
  }
  next();
};

// Não cadastra vendas com quantidade menor ou igual a zero
const saleValidation = async (req, res, next) => {
  const [...itensSold] = req.body;

  itensSold.forEach((item) => {
    if (item.quantity < 0 || item.quantity === 0 || !Number.isInteger(item.quantity)) {
      return res.status(422).json(buildError('invalid_data', 'Wrong product ID or invalid quantity'));
    }
  });
  next();
};

module.exports = {
  buildError,
  nameValidation,
  quantityValidation,
  existingNameValidation,
  saleValidation,
};
