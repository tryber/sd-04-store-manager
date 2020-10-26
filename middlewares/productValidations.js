const productModel = require('../model/productModel');

const buildResponse = (code, message) => ({ err: { code, message } });

const validationPresenceOfName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(422).json(buildResponse('data', 'Nome não pode ser vazio!'));
  }
  next();
};

const validationLengthOfName = (req, res, next) => {
  const { name } = req.body;
  if (name.length < 5 || name.length < 1) {
    return res
      .status(422)
      .json(buildResponse('invalid_data', '"name" length must be at least 5 characters long'));
  }
  next();
};

const validationQuantityOfProduct = (req, res, next) => {
  const { quantity } = req.body;

  if (quantity < 1) {
    return res
      .status(422)
      .json(buildResponse('invalid_data', '"quantity" must be larger than or equal to 1'));
  }
  next();
};

const validationProductExistsByName = async (req, res, next) => {
  const { name } = req.body;
  const product = await productModel.findByName(name);

  if (product) {
    return res.status(422).json(buildResponse('invalid_data', 'Product already exists'));
  }
  next();
};

const validationStringOfProduct = (req, res, next) => {
  const { quantity } = req.body;
  if (!Number.isInteger(quantity)) {
    return res.status(422).json(buildResponse('invalid_data', '"quantity" must be a number'));
  }
  next();
};

const validationReturnProduct = async (req, res, next) => {
  const productChoice = await productModel.findProductById(req.params.id);
  if (!productChoice) {
    res.status(422).json(buildResponse('invalid_data', 'Wrong id format'));
  }
  req.product = productChoice;
  // produto recebe os dados que vieram do banco de dados, então req.product, utilizado no controller terá o valor de productChoice
  next();
};

module.exports = {
  buildResponse,
  validationPresenceOfName,
  validationLengthOfName,
  validationProductExistsByName,
  validationQuantityOfProduct,
  validationStringOfProduct,
  validationReturnProduct,
};
