const Validation = require('../service/sale-validations');
const productModel = require('../model/product');

const authPost = async (req, res, next) => {
  const itensSold = req.body;

  const response = await Validation.isValidPost(itensSold);

  console.log('Response from service', response);

  if (response) {
    return res.status(response.status).json(response.error);
  }

  next();
};

const authQuantity = async (req, res, next) => {
  const itensSold = req.body;

  console.log('itensSold', itensSold);
  console.log('itensSold', itensSold[0].productId);
  const sale = await productModel.getProductById(itensSold[0].productId);
  console.log('sale mid', sale);
  console.log('sale mid quantity', sale.quantity);
  console.log('itensSold quantity', itensSold[0].quantity);
  if (itensSold[0].quantity > sale.quantity) {
    return res.status(404).json({ err: { code: 'stock_problem', message: 'Such amount is not permitted to sell' } });
  }
  next();
};

const authGet = async (req, res, next) => {
  const { id } = req.params;

  if (!id) { return next(); }

  const response = await Validation.isValidGet(id);

  if (response) { return res.status(response.status).json(response.error); }

  console.log('Middleware Get OK NEXT');
  next();
};

const authPut = async (req, res, next) => {
  const { name, quantity } = req.body;

  const response = await Validation.isValidPut(name, quantity);

  if (response) {
    return res.status(response.status).json(response.error);
  }

  console.log('Middleware Put OK NEXT');
  next();
};

const authDelete = async (req, res, next) => {
  const { id } = req.params;

  const response = await Validation.isValidDelete(id);

  if (response) {
    return res.status(response.status).json(response.error);
  }

  next();
};

module.exports = {
  authPost,
  authGet,
  authPut,
  authDelete,
  authQuantity,
};
