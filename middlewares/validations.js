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

  if (!Number.isInteger(quantity) && quantity > 0) {
    return res
      .status(422)
      .json(buildError('invalid_data', '"quantity" must be a number'));
  }
  if (quantity < 1) return res.status(422).json(buildError('invalid_data', '"quantity" must be larger or equal to 1'));
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

module.exports = {
  nameValidation,
  quantityValidation,
  existingNameValidation,
};
