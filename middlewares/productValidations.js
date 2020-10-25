const productModel = require('../model/productModel');

const buildResponse = (code, message) => {
  return { err: { code, message } };
};

validationPresenceOfName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(422).json(buildResponse('data', 'Nome não pode ser vazio!'));
  }
  next();
};

validationLengthOfName = (req, res, next) => {
  const { name } = req.body;
  if (name.length < 5 || name.length < 1) {
    return res
      .status(422)
      .json(buildResponse('invalid_data', '"name" length must be at least 5 characters long'));
  }
  next();
};

validationProductExistsByName = async (req, res, next) => {
  const { name } = req.body;
  const product = await productModel.findByName(name);

  if (product) {
    return res.status(422).json(buildResponse('invalid_data', 'Product already exists'));
  }
  next();
};

validationQuantityOfProduct = (req, res, next) => {
  const { quantity } = req.body;

  if (quantity < 1) {
    return res
      .status(422)
      .json(buildResponse('invalid_data', '"quantity" must be larger than or equal to 1'));
  }
  next();
};

validationStringOfProduct = (req, res, next) => {
  const { quantity } = req.body;
  if (!Number.isInteger(quantity)) {
    return res.status(422).json(buildResponse('invalid_data', '"quantity" must be a number'));
  }
  next();
};

module.exports = {
  buildResponse,
  validationPresenceOfName,
  validationLengthOfName,
  validationProductExistsByName,
  validationQuantityOfProduct,
  validationStringOfProduct,
};
