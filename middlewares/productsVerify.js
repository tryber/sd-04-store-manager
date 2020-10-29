const productsModel = require('../models/productsModel');
const messageFunction = require('../service/index');

const nameLengthVerify = (req, res, next) => {
  const { name } = req.body;
  if (name.length < 5) {
    return res
      .status(422)
      .json(messageFunction('"name" length must be at least 5 characters long'));
  }
  next();
};

const nameExistsVerify = async (req, res, next) => {
  const { name } = req.body;
  const product = await productsModel.getByName(name);

  if (product) {
    return res.status(422).json(messageFunction('Product already exists'));
  }
  next();
};

const quantityVerify = async (req, res, next) => {
  const { quantity } = req.body;
  if (quantity <= 0) {
    return res.status(422).json(messageFunction('"quantity" must be larger than or equal to 1'));
  }
  next();
};

const numberQuantityVerify = async (req, res, next) => {
  const { quantity } = req.body;
  if (!Number.isInteger(quantity)) {
    return res.status(422).json(messageFunction('"quantity" must be a number'));
  }
  next();
};

module.exports = {
  nameLengthVerify,
  nameExistsVerify,
  quantityVerify,
  numberQuantityVerify,
};
