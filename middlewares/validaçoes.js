const productModel = require('../models/productModel');

const responseBuild = (message) => ({ err: { code: 'invalid_data', message } });

const exist = async (req, res, next) => {
  const { name } = req.body;
  const product = await productModel.findByName('products', name);
  if (product) {
    return res.status(422).json(responseBuild('Product already exists'));
  }
  next();
};

const quantitySales = async (req, res, next) => {
  const array = req.body;
  for (let i = 0; i < array.length; i += 1) {
    if (array[i].quantity < 1 || !Number.isInteger(array[i].quantity)) {
      return res.status(422).json(responseBuild('Wrong product ID or invalid quantity'));
    }
  }
  next();
};

const nameTest = (req, res, next) => {
  const { name } = req.body;
  if (!name || typeof name !== 'string') {
    return res.status(422).json(responseBuild('"name" nao é uma string'));
  } else if (name.length <= 5) {
    return res.status(422).json(responseBuild('"name" length must be at least 5 characters long'));
  }
  next();
};

const quantityTest = (req, res, next) => {
  const { quantity } = req.body;
  if (!Number.isInteger(quantity)) {
    return res.status(422).json(responseBuild('"quantity" must be a number'));
  } else if (quantity <= 0) {
    return res.status(422).json(responseBuild('"quantity" must be larger than or equal to 1'));
  }
  next();
};


const idTest = async (req, res, next) => {
  const { id } = req.params;
  const product = await productModel.findById('products', id);
  if (!product) {
    res.status(422).json(responseBuild('Wrong id format'));
  }
  next();
};

module.exports = { nameTest, quantityTest, exist, idTest, quantitySales };
