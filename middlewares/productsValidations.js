const { ObjectId } = require('mongodb');
const productsModel = require('../models/productsModel');

const errors = {
  1: {
    err: {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long',
    },
  },
  2: {
    err: {
      code: 'invalid_data',
      message: 'Product already exists',
    },
  },
  3: {
    err: {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1',
    },
  },
  4: {
    err: {
      code: 'invalid_data',
      message: '"quantity" must be a number',
    },
  },
  5: {
    err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    },
  },
};

const createProductVal = async (req, res, next) => {
  const { name, quantity } = req.body;
  const product = await productsModel.readByName(name);
  const resp = (nErr) => res.status(422).json(errors[nErr]);

  if (name.length < 5) return resp(1);
  if (product) return resp(2);
  if (quantity <= 0) return resp(3);
  if (!Number.isInteger(quantity)) return resp(4);

  next();
};

const readProductVal = async (req, res, next) => {
  const id = req.params.id;
  const resp = (nErr) => res.status(422).json(errors[nErr]);

  if (!ObjectId.isValid(id)) return resp(5);

  const product = await productsModel.readById(id);

  if (!product) return resp(5);

  req.product = product;

  next();
};

const updateProductVal = async (req, res, next) => {
  const { name, quantity } = req.body;
  const resp = (nErr) => res.status(422).json(errors[nErr]);

  if (name.length < 5) return resp(1);
  if (quantity <= 0) return resp(3);
  if (!Number.isInteger(quantity)) return resp(4);

  next();
};

const deleteProductVal = async (req, res, next) => {
  const id = req.params.id;
  const resp = (nErr) => res.status(422).json(errors[nErr]);
  let product;

  if (ObjectId.isValid(id)) {
    product = await productsModel.readById(id);
  } else {
    return resp(5);
  }

  if (!product) return resp(5);

  next();
};

module.exports = {
  createProductVal,
  readProductVal,
  updateProductVal,
  deleteProductVal,
};
