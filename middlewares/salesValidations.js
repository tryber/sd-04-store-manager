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

const createSalesVal2 = async (pendencies, resp) => {
  const products = await Promise.all(pendencies);

  for (let i = 0, len = products.length; i < len; i += 1) {
    if (!products[i]) return resp(1);
  }
};

const createSalesVal = async (req, res, next) => {
  const pendencies = [];
  const resp = (nErr) => res.status(422).json(errors[nErr]);

  for (let i = 0, len = req.body.length; i < len; i += 1) {
    const id = req.body[i].productId;
    const qtt = req.body[i].quantity;

    if (!ObjectId.isValid(id) || qtt <= 0 || !Number.isInteger(qtt)) return resp(1);

    pendencies.push(productsModel.readById(id));
  }

  createSalesVal2(pendencies, resp);
  next();
};

// const createSalesVal = async (req, res, next) => {
//   const pendencies = req.body.map((pdt) => {
//     const id = pdt.productId;
//     const qtt = pdt.quantity;
//     const resp = (nErr) => res.status(422).json(errors[nErr]);

//     if (!ObjectId.isValid(id) || qtt <= 0 || !Number.isInteger(qtt)) return resp(1);

//     return productsModel.readById(id);
//   })

//   const products = await Promise.all(pendencies);

//   products.forEach((product) => {
//     if (!product) return resp(1);
//   });

//   next();
// };

module.exports = {
  createSalesVal,
};
