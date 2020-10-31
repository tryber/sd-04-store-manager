const { ObjectId } = require('mongodb');
const productsModel = require('../models/productsModels');
const salesModel = require('../models/salesModels');

const errors = {
  1: {
    err: {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    },
  },
  2: {
    err: {
      code: 'not_found',
      message: 'Sale not found',
    },
  },
  3: {
    err: {
      code: 'invalid_data',
      message: 'Wrong sale ID format',
    },
  },
};

// Separação devido ao CC :(
const checkProductsExistence = async (pendencies, resp, next) => {
  const products = await Promise.all(pendencies);

  for (let i = 0, len = products.length; i < len; i += 1) {
    if (!products[i]) return resp(1);
  }

  next();
};
// ===

const createSalesVal = async (req, res, next) => {
  const pendencies = [];
  const resp = (nErr) => res.status(422).json(errors[nErr]);

  for (let i = 0, len = req.body.length; i < len; i += 1) {
    const id = req.body[i].productId;
    const qtt = req.body[i].quantity;

    if (!ObjectId.isValid(id) || qtt <= 0 || !Number.isInteger(qtt)) return resp(1);

    pendencies.push(productsModel.readById(id));
  }

  checkProductsExistence(pendencies, resp, next);
};

const readSaleVal = async (req, res, next) => {
  const id = req.params.id;
  const resp = (nErr) => res.status(404).json(errors[nErr]);

  if (!ObjectId.isValid(id)) return resp(1);

  const sale = await salesModel.readById(id);

  if (!sale) return resp(2);

  req.sale = sale;

  next();
};

const updateSaleVal = async (req, res, next) => {
  const [{ quantity }] = req.body;
  const resp = (nErr) => res.status(422).json(errors[nErr]);

  if (quantity <= 0) return resp(1);
  if (!Number.isInteger(quantity)) return resp(1);

  next();
};

const deleteSaleVal = async (req, res, next) => {
  const id = req.params.id;
  const resp = (nErr) => res.status(422).json(errors[nErr]);
  let sale;

  if (ObjectId.isValid(id)) {
    sale = await salesModel.readById(id);
  } else {
    return resp(3);
  }

  if (!sale) return res.status(404).json(errors[2]);

  next();
};

module.exports = {
  createSalesVal,
  readSaleVal,
  updateSaleVal,
  deleteSaleVal,
};
