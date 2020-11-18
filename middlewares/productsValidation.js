const productsModel = require('../models/productsModel');
const buildResponse = require('./buildResponse');

const nameLengthValidation = (req, res, next) => {
  const { name } = req.body;
  if (name.length < 5) {
    return res
      .status(422)
      .json(buildResponse('invalid_data', '"name" length must be at least 5 characters long'));
  }
  next();
};

const nameExistenceValidation = async (req, res, next) => {
  const { name } = req.body;
  const product = await productsModel.findByName(name);

  if (product) {
    return res.status(422).json(buildResponse('invalid_data', 'Product already exists'));
  }

  next();
};

const quantityValidation = (req, res, next) => {
  const { quantity } = req.body;
  if (quantity <= 0) {
    return res
      .status(422)
      .json(buildResponse('invalid_data', '"quantity" must be larger than or equal to 1'));
  }

  next();
};

const isNumberValidation = (req, res, next) => {
  const { quantity } = req.body;
  // Referencia: isNaN Stack Overflow - https://bityli.com/JOfue
  if (isNaN(quantity)) {
    return res.status(422).json(buildResponse('invalid_data', '"quantity" must be a number'));
  }

  next();
};

const idExistsValidation = async (req, res, next) => {
  const { id } = req.params;
  const product = await productsModel.findById(id);

  if (!product) {
    return res.status(422).json(buildResponse('invalid_data', 'Wrong id format'));
  }

  req.product = product;

  next();
};

module.exports = {
  nameLengthValidation,
  nameExistenceValidation,
  quantityValidation,
  isNumberValidation,
  idExistsValidation,
};
