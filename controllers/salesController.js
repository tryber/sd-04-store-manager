const productsModel = require('../models/producstModel');
const salesModel = require('../models/salesModel');

const invalidInput = (req, res, next) => {
  const itensSold = req.body;
  let inputNumber = true;
  itensSold.forEach((item) =>
    isNaN(item.quantity) || item.quantity < 1 ? inputNumber = false : inputNumber
  );
  if (!inputNumber) {
    return res.status(422).send({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }
  return next();
};

const add = async (req, res) => {
  const itensSold = req.body;
  const addSales = await salesModel.add(itensSold);
  if (addSales) {
    return res.status(200).json(addSales);
  }
  return res.status(422).send({
    err: {
      message: 'Não foi possível cadastrar a venda',
    },
  });
};

module.exports = {
  invalidInput,
  add,
};
