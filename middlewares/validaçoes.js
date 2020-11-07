const productModel = require('../models/productModel');
const salesModel = require('../models/salesModel');

const responseBuild = (code, message) => ({ err: { code, message } });

const exist = async (req, res, next) => {
  const { name } = req.body;
  const product = await productModel.findByName('products', name);
  if (product) {
    return res.status(422).json(responseBuild('invalid_data', 'Product already exists'));
  }
  next();
};

const quantitySales = (req, res, next) => {
  const array = req.body;
  for (let i = 0; i < array.length; i += 1) {
    if (array[i].quantity < 1 || !Number.isInteger(array[i].quantity)) {
      return res
        .status(422)
        .json(responseBuild('invalid_data', 'Wrong product ID or invalid quantity'));
    }
  }
  next();
};

const nameTest = (req, res, next) => {
  const { name } = req.body;
  if (!name || typeof name !== 'string') {
    return res.status(422).json(responseBuild('invalid_data', '"name" nao é uma string'));
  } else if (name.length <= 5) {
    return res
      .status(422)
      .json(responseBuild('invalid_data', '"name" length must be at least 5 characters long'));
  }
  next();
};

const quantityTest = (req, res, next) => {
  const { quantity } = req.body;
  if (!Number.isInteger(quantity)) {
    return res.status(422).json(responseBuild('invalid_data', '"quantity" must be a number'));
  } else if (quantity <= 0) {
    return res
      .status(422)
      .json(responseBuild('invalid_data', '"quantity" must be larger than or equal to 1'));
  }
  next();
};

const idTest = async (req, res, next) => {
  const { id } = req.params;
  const product = await productModel.findById('products', id);
  if (!product) {
    res.status(422).json(responseBuild('invalid_data', 'Wrong id format'));
  }
  next();
};

const existSales = async (req, res, next) => {
  let sales = null;
  if (req.params.id) sales = await salesModel.findByIdSales('sales', req.params.id);
  else sales = await salesModel.getAllSales('sales');
  if (!sales || sales.length === 0) {
    res.status(404).json(responseBuild('not_found', 'Sale not found'));
  }
  next();
};

const existSalesDelete = async (req, res, next) => {
  const sales = await salesModel.findByIdSales('sales', req.params.id);
  if (!sales || sales.length === 0) {
    res.status(422).json(responseBuild('invalid_data', 'Wrong sale ID format'));
  }
  next();
};

module.exports = {
  nameTest,
  quantityTest,
  exist,
  idTest,
  quantitySales,
  existSales,
  existSalesDelete,
};
