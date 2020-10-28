const { ObjectId } = require('mongodb');
const productsModel = require('../models/productsModel');

const errors = {
  1: {
    err: {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    },
  },
};

const createSalesVal = async (req, res, next) => {  
  for (let i = 0, len = req.body.length; i < len; i += 1) {
    const id = req.body[i].productId;
    const qtt = req.body[i].quantity;
    const resp = (nErr) => res.status(422).json(errors[nErr]);

    if (!ObjectId.isValid(id) || qtt <= 0 || !Number.isInteger(qtt)) return resp(1);

    const product = await productsModel.readById(id);

    if (!product) return resp(1);
  }

  next();
};

module.exports = {
  createSalesVal,
};
