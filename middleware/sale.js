const Validation = require('../service/sale-validations');
const productModel = require('../model/product');

const authPost = (req, res, next) => {
  const itensSold = req.body;

  const response = Validation.isValidPost(itensSold);

  console.log('Response from service', response);

  if (response) {
    return res.status(response.status).json(response.error);
  }

  next();
};

const authQuantity = async (req, res, next) => {
  const itensSold = req.body;
  const sale = await productModel.getProductById(itensSold[0].productId);
  console.log('sale mid', sale);
  console.log('sale mid quantity', sale.quantity);
  console.log('itensSold quantity', itensSold[0].quantity);
  if (itensSold[0].quantity > sale.quantity) {
    return res.status(404).json({ err: { code: 'stock_problem', message: 'Such amount is not permitted to sell' } });
  }
  next();
};

const authSaleGet = async (req, res, next) => {
  const { id } = req.params;

  if (!id) { return next(); }

  const isvalid = await Validation.isValidGet(id);

  if (isvalid) { return res.status(isvalid.status).json(isvalid.error); }

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

const authDelete = (req, res, next) => {
  const { id } = req.params;

  const response = Validation.isValidDelete(id);

  if (response) {
    return res.status(response.status).json(response.error);
  }

  next();
};

module.exports = {
  authPost,
  authSaleGet,
  authPut,
  authDelete,
  authQuantity,
};
